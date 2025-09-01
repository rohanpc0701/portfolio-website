#!/usr/bin/env node

/**
 * Link Check Script for Portfolio
 * Checks important external and internal links
 */

import https from 'https';
import http from 'http';

const links = [
  'https://rohan-chavan.vercel.app/',
  'https://github.com/RohanChavan0701',
  'https://www.linkedin.com/in/rohan-chavan-708532200/',
  'https://rohan-chavan.vercel.app/images/projects/Rohan_Chavan_Resume.pdf'
];

function checkLink(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      const statusCode = res.statusCode;
      // Consider 2xx OK, 3xx redirects OK, and LinkedIn 999 as OK
      const ok = (statusCode >= 200 && statusCode < 300) || (statusCode >= 300 && statusCode < 400) || statusCode === 999;
      resolve({ url, status: statusCode, ok });
    });
    
    req.on('error', (err) => {
      resolve({ url, status: 'ERROR', ok: false, error: err.message });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT', ok: false, error: 'Request timeout' });
    });
  });
}

async function main() {
  console.log('🔍 Checking portfolio links...\n');
  
  let allOk = true;
  
  for (const link of links) {
    const result = await checkLink(link);
    const status = result.ok ? '✅' : '❌';
    const statusText = result.ok ? 'OK' : `FAILED (${result.status})`;
    
    console.log(`${status} ${link}`);
    console.log(`   Status: ${statusText}`);
    
    if (!result.ok && result.error) {
      console.log(`   Error: ${result.error}`);
    }
    console.log('');
    
    if (!result.ok) {
      allOk = false;
    }
  }
  
  if (allOk) {
    console.log('🎉 All links are working correctly!');
    process.exit(0);
  } else {
    console.log('⚠️  Some links failed. Please check the errors above.');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('💥 Script error:', error);
  process.exit(1);
});
