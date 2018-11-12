Ext.getResourcePath = function(path, poolName, packageName) {
    if (typeof path !== 'string') {
        poolName = path.pool;
        packageName = path.packageName;
        path = path.path;
    }
    var manifest = Ext.manifest,
        paths = manifest && manifest.resources,
        poolPath = paths[poolName],
        output = [];
    if (poolPath == null) {
        poolPath = paths.path;
        if (poolPath == null) {
            poolPath = 'resources';
        }
    }
    if (poolPath) {
        output.push(poolPath);
    }
    if (packageName) {
        output.push(packageName);
    }
    output.push(path);
    return output.join('/');
};
