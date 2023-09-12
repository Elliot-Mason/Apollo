module.exports = {
    files: [
        'build/**/*.html'
    ],
    from: [/href="\//g, /src="\//g],
    to: ['href="', 'src="']
}
