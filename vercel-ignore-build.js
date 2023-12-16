console.log(process.env['VERCEL_ENV']);
console.log(process.env['VERCEL_GIT_PULL_REQUEST_ID']);

// if we're trying to build a preview deployment, make sure it it made with an open PR
if (process.env['VERCEL_ENV'] === 'preview' && process.env['VERCEL_GIT_PULL_REQUEST_ID'] === '') {
    process.exit(0);
} else {
    process.exit(1);
}