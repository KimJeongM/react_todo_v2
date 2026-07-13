
/* 각 json을 받아서 데이터를 파싱하는 역할  */
export async function FetchData(url){
    const response = await fetch(url); 
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}



