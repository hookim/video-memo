# Motivation
1. 유튜브 영상을 보다가 영상의 특정지점에서 메모를 남길 수 있는 기능이 있으면 좋겠다는 생각이 들었다. 
2. 유데미에 비슷한 기능이 있지만 유데미는 교육 영상 컨텐츠에 한정적이기 때문에 기존에 하는 수업 필기같은 느낌을 버릴 수 없었다.
3. 반면에 유튜브에는 다양한 영상 컨텐츠들이 존재하기 때문에 굉장히 다양한 환경에서 필기라는 개념이 만나 새로운 경험을 선사할 수 있을 것이라고 생각했다. 
# 프로젝트 설명
유튜브 영상을 기반으로 한 메모. 영상을 시청하다가 메모를 추가하면 해당 영상 시간대에 대한 메모를 작성할 수 있다. html, css, javascript 그리고 youtube API를 활용한 프론트엔드 프로젝트. 


# 구현
## <영상 임베딩>

### What?

유튜브 영상링크를 입력하면 해당 링크를 embed 형식으로 바꿔서 영상을 웹페이지의 준비된 `div`단에 올리는 기능

### How?

1. Link주소 변형 
    1. 웹페이지에 유튜브 영상을 가져오기 위해서는 일반 링크 형식이 아니라 url주소에`embed`라는 옵션이 있어야 한다.
    2. [`https://www.youtube.com/watch?v=C7nvDN79U7M`](https://www.youtube.com/watch?v=C7nvDN79U7M)를 [`https://www.youtube.com/embed/C7nvDN79U7M`](https://www.youtube.com/embed/C7nvDN79U7M) 로 바꿔야 한다.
    3. 따라서 원본 문자열의 `.com`까지 부분적으로 잘라내고 `=`이후의 문자열 또한 부분적으로 잘라낸 이후 그 사이에 `embed/`라는 문자열을 삽입하는 방식으로 작업을 했다.
    4. `indexOf('str')`를 특정 문자열을 포함하기 시작하는 부분을 확인 한 이후 특정문자열의 길이를 더해 잘라내야 할 기준선을 구했다.
    5. 그 이후 `slice (begin [,end])를` 활용해서 문자열을 잘라냈고 알맞게 잘라낸 문자열들을 더했다.

## <영상 연동 메모기능>

### What?

메모생성 버튼을 누르면 유튜브 영상의 현재 재생시간에 따른 타임스탬프 형식의 메모가 생성된다. 해당 타임스탬프 버튼을 누르면 영상의 해당 장면으로 이동한다. 

### How?

1. API 사용
    1. 원래는 `youtube iframe api`를 사용하지 않고 그냥 `<iframe>`태그에다가 `src`를 가져와서 집어넣는 방식으로 구성했다. 하지만 이 방식으로는 현재 프로젝트의 핵심인 영상의 현재 시간을 구할 방법이 없었다. 어쩔 수 없이 API를 사용해서 구현하는 방식을 채택할 수 밖에 없었다. 
    2. `fetch`를 사용하는 방식이 아니라 스크립트 태그의 `src`에 api주소를 배정하는 방식이었다. 마치 `CDN`를 사용하듯이 말이다.
        
        ```html
        <script src = "https://www.youtube.com/iframe_api" > </script>
        ```
        
    3. 해당 api또한 asynchronous하게 작업되기 때문에 `Promise`의 `then`과 같은 역할을 할 친구들이 필요하다. 여기서는 다음과 같다.
        
        ```jsx
        
              // 3. This function will be called after the API code downloads.
              var player;
              function onYouTubeIframeAPIReady() { ... }
        
              // 4. The API will call this function when the video player is ready.
              function onPlayerReady(event) { ... }
        
              // 5. The API calls this function when the player's state changes.
              //    The function indicates that when playing a video (state=1),
              function onPlayerStateChange(event) { ... }
                
        ```
        
        해당 함수들은 api의 진행상태에 따라 자바스크립트 코드가 sync하게 끝난 이후에 호출된다.
        
    4. `Player`객체를 생성하는 방식은 다음과 같다. 
        
        ```jsx
        player = new YT.Player('clip', {
                height: '390',
                width: '640',
                videoId: currentMemo.videoId,
                playerVars: {
                    'playsinline': 1
                }
            });
        ```
        
        `'clip'`은 `document.querySelector('#clip')`의 개념이다. 해당 id를 가진 태그밑에 영상을 삽입하는 것이다. 하지만 해당 코드는 밖에서 사용할 수 없고 위에 `then`의 역할을 하는 함수 내부에서 호출해야 한다. 왜냐하면 api가 비동기적으로 전부 다운받아지기 전 까지는 해당 객체를 사용할 수 없기 때문이다.
        
    5. `player.getCurrenTime()` : 영상의 현재 시간을 정밀한 소수점의 초단위로 리턴한다. player를 사용하기 위해서는 `addEventListener`를 사용하거나 `then`을 사용해야 한다. 자바스크립트가 sync하게 작동되는 시간에는 api가 완벽하게 전달되지 않았기 때문이다. 
2. AddEventListener
    1. Git을 쓰다가 branch를 만들고 `reset —hard`를 했는데 메인 브랜치의 값에도 적용되는 일이 발생해서 어쩔 수없이 다시 새롭게 설계했다.
    2. `addEventListener`는 자바스크립트가 sync하게 지나간 후에 남아서 작업을 하는 웹의 핵심적인 도구다.
    3. 버튼, 인풋 등 다양한 요소들을 생성할 당시에 이 `addEventListner`를 붙여주면 나중에 사용할 수 있다. 일종의 부적을 미리 붙여놓는 것이다. 
    4. 우선 영상 메모를 생성하고 해당 메모를 `localStorage`에 저장한다. 생성할 당시에 `addEventListener`를 더했기 때문에 사용자와의 상호작용이 가능하다. 그리고 해당 페이지를 떠났다가 다시 돌아올 때 렌더링을 시키는 함수를 생각해보자. 무사히 렌더링이 됐다. 그런데 렌더링된 요소들이 이벤트에 반응하지 않는다. 이런일이 발생하지 않게 하려면 새롭게 렌더링을 하는 경우에도 `addEventListener`를 덧붙여야 한다. 
    5. 결국 이 두 함수를 따로 나눌 필요없이 하나의 함수로 구현을 하는 것이다. 생성은 새롭게 만든 값에서 렌더링은 기존의 값에서 정보를 구해 새롭게 생성하듯이 구현한다.
    6. `addEventListener`는 `element`들이 세상에 나올 때 붙여줘야 나중에 효력을 발휘한다.
3. Player객체를 addEventListener까지 무사히 전달하기
    1. 초반에 해맸던 것은 이 `Player`객체 때문이었다. 다른 함수에서도 사용할 수 있게 하고 싶었다. 그래서 맨 처음 생각했던 것은 `Promise`, `async`함수였다. 하지만 `Player`객체는 API의 다운로드 완료여부에 전적으로 의존하기 때문에 `then`의 실행조건을 내가 임의로 설정할수도 없었다. 
    2. 물론 main 함수의 `addEventListner`에서는 사용할 수 있었지만 다른 함수 내부의 `addEventListner`에서는 사용할 수 없었다. 2번의 예시에서처럼 다른 함수내부의 listner에서는 `Promise`를 사용할 수 없었다.
    3. 하지만 의외로 해결책은 단순했다. 바로 API다운이 완성되면 실행되는 `then`역할을 하는 함수에다가 `Player`객체를 인자로 받는 함수를 호출하는 것! `Player`객체와 한배를 타게 된다.
  # Takeaway
  비동기적으로 작동하는 코드들에 대해 이해하는 시간을 가졌다. 이들을 추후에 활용하기 위해서는 기존 코드 작성 방식이 아닌 then또는 API측에서 제공하는 방식을 따라야 한다는 것. 
  # 작동영상
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/9Dh_ujchE78/0.jpg)](https://www.youtube.com/watch?v=9Dh_ujchE78)