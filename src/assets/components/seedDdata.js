// seedData.js
import { addZero, generateId } from "./util";

function offsetDate(daysFromToday) {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    return `${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}`;
}

export function getSeedCategories() {
    return [
        { id: 1, name: "업무", color: "#FCB2CB" },
        { id: 2, name: "공부", color: "#5C6DC9" },
        { id: 3, name: "운동", color: "#391022" },
        { id: 4, name: "여가생활", color: "#FBCE35" },
        { id: 5, name: "일상", color: "#64C3C9" },
    ];
}

export function getSeedTodos() {
    return [
        { id: generateId(), title: "오늘의 우선순위 정리", category: "업무", categoryId: 1, date: offsetDate(0), alarm: "09:30", completed: false },
        { id: generateId(), title: "점심시간 산책 15분", category: "운동", categoryId: 3, date: offsetDate(0), alarm: null, completed: true },
        { id: generateId(), title: "어제 못다한 문서 정리", category: "업무", categoryId: 1, date: offsetDate(-1), alarm: null, completed: true },
        { id: generateId(), title: "React 강의 이어보기", category: "공부", categoryId: 2, date: offsetDate(-3), alarm: null, completed: true },
        { id: generateId(), title: "이번 주 장보기", category: "일상", categoryId: 5, date: offsetDate(2), alarm: null, completed: false },
        { id: generateId(), title: "친구와 저녁 약속", category: "여가생활", categoryId: 4, date: offsetDate(4), alarm: "18:30", completed: false },
        { id: generateId(), title: "이번 달 목표 점검", category: "공부", categoryId: 2, date: offsetDate(10), alarm: null, completed: false },
        // ... 필요한 만큼 offsetDate 값만 바꿔가며 추가
    ];
}

// CategoryContext.jsx / TodoContext.jsx
import { getSeedCategories } from "./seedData";

const saved = localStorage.getItem('calendo_categories');
if (saved) {
    setCategoryItem(JSON.parse(saved));
} else {
    const seed = getSeedCategories(); // fetch(categories.json) 대신
    setCategoryItem(seed);
    localStorage.setItem('calendo_categories', JSON.stringify(seed));
}