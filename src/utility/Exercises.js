export const Exercises = [
    {route: 'pull-ups', label: 'Pull-ups'},
    {route: 'push-ups', label: 'Push-ups'}
]

export function convertToCamelCase(exercise) {
    return exercise
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}