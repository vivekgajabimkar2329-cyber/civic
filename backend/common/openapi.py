def preprocessing_filter_spec(endpoints):
    filtered = []
    for (path, path_regex, method, callback) in endpoints:
        # Exclude any endpoint paths that contain '/v1/'
        if "/v1/" not in path:
            filtered.append((path, path_regex, method, callback))
    return filtered
