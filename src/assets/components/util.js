export function getToday(){
    const today = new Date(); 
    return {
        year : String(today.getFullYear()), 
        month : addZero(today.getMonth() + 1), 
        date : addZero(today.getDate())
    }
}

export function showDateType(){

}

export function changeDate(date){
    return date.replaceAll('-', '.'); 
}

export function addZero(number){
    return String(number).padStart(2, '0');
}

export function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}