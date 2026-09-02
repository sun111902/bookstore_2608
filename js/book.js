// new section tabmenu
const tabItems = document.querySelectorAll('#booktab li');
const tabs = document.querySelectorAll('.books > div');

tabItems.forEach((tab, i) => {
    tab.addEventListener('click', () => {
        // 탭에 해당하는 리스트 보이고, 나머지는 숨기기
        tabs.forEach((tab, j) => {
            tab.style.display = (i === j) ? 'flex' : 'none';
        });
    });
});

//new section books
async function fetchBooks(query) {
    const REST_API_KEY = "354a663e6079cbd2ca6b0101277b3592"
    const params = new URLSearchParams({
        query,
        size: 20
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
    }

    return response.json();
}

async function bookData() {
    
    try {
        const queries = [
            { query: "소설", sectionId: "novel" },
            { query: "기욤 뮈소", sectionId: "person" },
            { query: "원피스", sectionId: "cartoon" },
            { query: "종교", sectionId: "religion" },
            { query: "불교", sectionId: "oldbook" },
            { query: "요리", sectionId: "price1" },
            { query: "인문", sectionId: "price2" },
            { query: "예술", sectionId: "price3" },
            { query: "여행", sectionId: "price4" },
            { query: "경제", sectionId: "price5" },

        ];

        for (const { query, sectionId } of queries) {
            const data = await fetchBooks(query);
console.log(data)
            // 해당 섹션 내의 .box 요소 8개 선택
            const section = document.querySelector(`#${sectionId}`);
            const boxElements = section.querySelectorAll(".book");

            boxElements.forEach((box, i) => {
                const doc = data.documents[i];
                if (!doc) return;

                // 요소 생성 및 추가
                box.innerHTML = `<img src="${doc.thumbnail}">
                        <h3>${doc.title}</h3>
                        <p>${doc.price}</p>
                        <p>${doc.sale_price.toLocaleString()}원</p>
                        `
            });
        }
    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();