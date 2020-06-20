export function getMockTemplate(option) {
    let id = Date.now();

    return {
        id,
        name: option.name || `Mock-${id}`,
        endpoint: option.endpoint,
        method: 'GET',
        body: '',
        settings: {}
    }
}