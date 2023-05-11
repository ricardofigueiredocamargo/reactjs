export function addClassName(value: string, type:string) {
    let span = ''
    if (value === '=' || value === '0') {
        span = `span-two-${type}`
    }
    return span
}