const BuildRunner = require('./build-runner');

const runner = new BuildRunner();

// Define your tasks (replace these with your actual NPS script equivalents)
runner.addTask('clean', 'rm -rf dist', {
    cwd: process.cwd()
});

runner.addTask('lint', 'eslint src --ext .js,.ts', {
    cwd: process.cwd()
});

runner.addTask('build:components', 'rollup -c', {
    cwd: process.cwd(),
    dependencies: ['clean']
});

runner.addTask('test', 'jest', {
    cwd: process.cwd()
});

runner.addTask('build', 'echo "Building project"', {
    dependencies: ['lint', 'build:components'],
    parallel: false
});

// Export for CLI usage
if (require.main === module) {
    const taskName = process.argv[2];
    if (!taskName) {
        console.log('Available tasks:', Array.from(runner.tasks.keys()).join(', '));
        process.exit(1);
    }

    runner.run(taskName).catch(error => {
        console.error('Task failed:', error.message);
        process.exit(1);
    });
}

module.exports = runner;