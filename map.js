/* map 메서드 형식 : 배열.map((요소, 인덱스, 배열) => {return 요소});

원리 : 반복문을 돌며 배열안의 요소들을 1대1로 짝지어준다 -> 매핑한다고 표현 

arr의 배열 5개의 값을 콘솔에 찍고싶다면 for문을 사용하기도 한다
이 for문의 형태가 아닌 map()함수를 사용해 바꾼다
map() 함수는 값과 인덱스를 인자로 받아서 자동으로 for문을 돌려 값을 빼도록 해준다


*/

const arr = [ 10, 20, 30, 40, 50 ];

//일반 함수 형태
arr.map(function(item, index) {
    console.log(index+"번 값", item);
});

//화살표 함수 형태
arr.map((item, index) => {
    console.log(index+"번 값", item);
});