export function createBirthInput(params) {
    return {
        birthYear: params.birthYear,
        birthMonth: params.birthMonth,
        birthDay: params.birthDay,
        birthHour: params.birthHour,
        birthMinute: params.birthMinute,
        gender: params.gender,
        timezone: params.timezone ?? 'Asia/Seoul',
        latitude: params.latitude ?? 37.5665,
        longitude: params.longitude ?? 126.978,
        name: params.name,
    };
}
//# sourceMappingURL=types.js.map