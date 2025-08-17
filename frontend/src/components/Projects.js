import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Calendar, Star, ArrowRight } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { firebaseReady } from '../services/firebase';
import { resolveThumbnailForRepo } from '../config/projectThumbnails';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Import modal state
  const [showImportModal, setShowImportModal] = useState(false);
  const [githubRepos, setGithubRepos] = useState([]);
  const [selectedRepoIds, setSelectedRepoIds] = useState(new Set());
  const [importing, setImporting] = useState(false);
  const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'RohanChavan0701';
  const [currentUser, setCurrentUser] = useState(null);

  // Exclude specific GitHub repositories from being shown
  // Normalized by lowercasing and removing spaces, hyphens, and underscores
  const EXCLUDED_REPO_KEYS = new Set([
    'nlpmini',
    'agenthacks',
    'agentmodules',
    'rohanchavan0701',
    'portfolio',
  ]);

  useEffect(() => {
    if (!firebaseReady) return;
    try {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase auth not initialized');
    }
  }, []);

  const handleSignIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error('Sign-in failed:', e);
    }
  };

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (e) {
      console.error('Sign-out failed:', e);
    }
  };
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'AI/ML', name: 'AI/ML' },
    { id: 'NLP', name: 'NLP' },
    { id: 'AI Safety', name: 'AI Safety' },
    { id: 'DevOps/API', name: 'DevOps' },
    { id: 'Computer Vision', name: 'Computer Vision' }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
    try {
        setLoading(true);
        if (GITHUB_USERNAME) {
          // Fetch directly from GitHub and show on site
          const resp = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            { headers: { Accept: 'application/vnd.github+json' } }
          );
          if (!resp.ok) throw new Error(`GitHub API error: ${resp.status}`);
          const repos = await resp.json();
          const mapped = repos
            .filter((r) => {
              if (r.fork) return false;
              const key = String(r.name || '')
                .toLowerCase()
                .replace(/[\s\-_]/g, '');
              return !EXCLUDED_REPO_KEYS.has(key);
            })
            .map((repo, idx) => mapRepoToProjectCreate(repo, idx + 1));
          const filtered = mapped.filter((p) => {
            if (selectedCategory === 'all') return true;
            if (p.category === selectedCategory) return true;
            const haystack = `${p.title} ${p.description} ${(p.tech || []).join(' ')}`.toLowerCase();
            switch (selectedCategory) {
              case 'AI/ML':
                return /(\b|_)(ai|ml|machine|learning|pytorch|tensorflow|langchain|llm|python)(\b|_)/.test(haystack);
              case 'NLP':
                return /(\b|_)(nlp|language|bert|gpt|transformer|chatbot|text)(\b|_)/.test(haystack);
              case 'DevOps/API':
                return /(\b|_)(api|devops|docker|kubernetes|openapi|rest|typescript|node|express)(\b|_)/.test(haystack);
              case 'Computer Vision':
                return /(\b|_)(vision|cv|image|opencv|clip|dinov)(\b|_)/.test(haystack);
              case 'AI Safety':
                return /(\b|_)(safety|alignment|red\s*team|adversarial|defender)(\b|_)/.test(haystack);
              default:
                return true;
            }
          });
          // Sort by recency and stars to highlight impact
          filtered.sort((a, b) => {
            const aStars = parseInt((a.highlights?.[0] || '').replace(/\D/g, '')) || 0;
            const bStars = parseInt((b.highlights?.[0] || '').replace(/\D/g, '')) || 0;
            return bStars - aStars;
          });
          setProjects(filtered);
        } else {
          try {
            const data = await portfolioAPI.getProjects(selectedCategory);
            setProjects(data);
          } catch (e) {
            console.warn('Backend projects API failed, falling back to empty list');
            setProjects([]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  const fetchGithubRepos = async () => {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const repos = await response.json();
    setGithubRepos(repos);
  };

  const toggleRepoSelect = (repoId) => {
    setSelectedRepoIds((prev) => {
      const next = new Set(prev);
      if (next.has(repoId)) next.delete(repoId);
      else next.add(repoId);
      return next;
    });
  };

  const selectAllRepos = () => {
    setSelectedRepoIds(new Set(githubRepos.map((r) => r.id)));
  };

  const clearSelectedRepos = () => setSelectedRepoIds(new Set());

  const inferCategory = (repo) => {
    const topics = repo.topics || [];
    const language = (repo.language || '').toLowerCase();
    const has = (kw) => topics.some((t) => t.toLowerCase().includes(kw));
    if (has('nlp')) return 'NLP';
    if (has('vision') || has('cv')) return 'Computer Vision';
    if (has('devops') || has('api')) return 'DevOps/API';
    if (has('safety')) return 'AI Safety';
    if (language.includes('python') || has('ml') || has('ai')) return 'AI/ML';
    return 'AI/ML';
  };

  const mapRepoToProjectCreate = (repo, order) => {
    const owner = repo?.owner?.login || GITHUB_USERNAME;
    const override = resolveThumbnailForRepo(repo.name);
    const image = override || `https://opengraph.githubassets.com/1/${owner}/${repo.name}`;
    const tech = Array.isArray(repo.topics) && repo.topics.length > 0
      ? repo.topics
      : (repo.language ? [repo.language] : ['GitHub']);
    return {
      title: repo.name?.replace(/[-_]/g, ' ') || 'GitHub Project',
      description: repo.description || 'Repository hosted on GitHub',
      long_description: repo.description || 'Imported from GitHub.',
      tech,
      category: inferCategory(repo),
      featured: false,
      github: repo.html_url,
      demo: repo.homepage || null,
      image,
      status: 'completed',
      highlights: [
        `Stars: ${repo.stargazers_count ?? 0}`,
        `Forks: ${repo.forks_count ?? 0}`,
        `Language: ${repo.language ?? 'N/A'}`,
      ],
      order,
    };
  };

  const handleOpenImport = async () => {
    try {
      setShowImportModal(true);
      setGithubRepos([]);
      setSelectedRepoIds(new Set());
      await fetchGithubRepos();
    } catch (e) {
      console.error('Failed to load GitHub repos:', e);
    }
  };

  const handleImportSelected = async () => {
    try {
      setImporting(true);
      // Determine next order index based on current projects
      const maxOrder = projects.reduce(
        (max, p) => (typeof p.order === 'number' ? Math.max(max, p.order) : max),
        0
      );
      const selected = githubRepos.filter((r) => selectedRepoIds.has(r.id));
      const payload = selected.map((repo, idx) =>
        mapRepoToProjectCreate(repo, maxOrder + idx + 1)
      );
      if (payload.length === 0) return;
      await portfolioAPI.createProjectsBulk(payload);
      setShowImportModal(false);
      // Refresh list
      const data = await portfolioAPI.getProjects(selectedCategory);
      setProjects(data);
    } catch (e) {
      console.error('Failed to import projects:', e);
    } finally {
      setImporting(false);
    }
  };

  const getProjectColor = (category) => {
    const colorMap = {
      'AI/ML': 'blue',
      'NLP': 'purple', 
      'AI Safety': 'red',
      'DevOps/API': 'green',
      'Computer Vision': 'cyan'
    };
    return colorMap[category] || 'gray';
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'from-blue-900/20 to-blue-800/10',
        border: 'border-blue-800/30 hover:border-blue-600/50',
        badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        button: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300'
      },
      purple: {
        bg: 'from-purple-900/20 to-purple-800/10',
        border: 'border-purple-800/30 hover:border-purple-600/50',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        button: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300'
      },
      red: {
        bg: 'from-red-900/20 to-red-800/10',
        border: 'border-red-800/30 hover:border-red-600/50',
        badge: 'bg-red-500/20 text-red-300 border-red-500/30',
        button: 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
      },
      green: {
        bg: 'from-green-900/20 to-green-800/10',
        border: 'border-green-800/30 hover:border-green-600/50',
        badge: 'bg-green-500/20 text-green-300 border-green-500/30',
        button: 'bg-green-500/20 hover:bg-green-500/30 text-green-300'
      },
      cyan: {
        bg: 'from-cyan-900/20 to-cyan-800/10',
        border: 'border-cyan-800/30 hover:border-cyan-600/50',
        badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        button: 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300'
      },
      gray: {
        bg: 'from-gray-900/20 to-gray-800/10',
        border: 'border-gray-800/30 hover:border-gray-600/50',
        badge: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
        button: 'bg-gray-500/20 hover:bg-gray-500/30 text-gray-300'
      }
    };
    return colorMap[color] || colorMap.gray;
  };

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    const color = getProjectColor(project.category);
    const colors = getColorClasses(color);

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br ${colors.bg} rounded-xl border ${colors.border} p-8`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{project.title}</h3>
              <span className={`px-3 py-1 ${colors.badge} rounded-full text-sm font-medium border`}>
                {project.category}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {project.long_description}
          </p>

          <div className="mb-6">
            <h4 className="text-white font-semibold mb-4">Key Highlights:</h4>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-3 text-gray-300">
                  <Star className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            {/* Recruiter-friendly CTA */}
            <div className="mt-4 text-sm text-gray-400">
              Impact summary: built with {project.tech.slice(0, 3).join(', ')} — see code and demo links below.
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-white font-semibold mb-4">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 px-4 py-2 ${colors.button} rounded-lg transition-colors`}
            >
              <Github className="w-4 h-4" />
              <span>View Code</span>
            </a>
            {project.demo && (
              <a 
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Featured <span className="text-blue-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Showcasing innovative AI/ML solutions and full-stack applications that solve real-world problems
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid or Empty State */}
        {projects.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-semibold text-white mb-3">No projects yet</h3>
            <p className="text-gray-400 mb-6">Your public GitHub repositories will show here automatically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => {
              const color = getProjectColor(project.category);
              const colors = getColorClasses(color);
              
              return (
                <div
                  key={project.id}
                  className={`group cursor-pointer bg-gradient-to-br ${colors.bg} rounded-xl border ${colors.border} overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 ${colors.badge} rounded-full text-sm font-medium border`}>
                        {project.category}
                      </span>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </div>
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4`}>
                      <ArrowRight className="w-6 h-6 text-white transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-orange-500/20 text-orange-300'
                      }`}>
                        {project.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2 py-1 bg-white/10 text-gray-400 rounded text-xs">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-3">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        {project.demo && (
                          <a 
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a 
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium rounded-full hover:from-gray-600 hover:to-gray-500 transform hover:scale-105 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Import modal removed: displaying GitHub repos automatically */}
    </section>
  );
};

export default Projects;