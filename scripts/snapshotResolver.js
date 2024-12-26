module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) => testPath + snapshotExtension, // Place snapshots next to the test file
  resolveTestPath: (snapshotPath, snapshotExtension) => snapshotPath.slice(0, -snapshotExtension.length), // Match snapshots with test files
  testPathForConsistencyCheck: 'some/example.test.js',
};
