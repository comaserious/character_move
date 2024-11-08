import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack } from 'lucide-react';

// 타일 크기 상수
const TILE_WIDTH = 30;
const TILE_HEIGHT = 33;

// 맵 매트릭스
const mapMatrix = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const characterData = [{"name": "Joy", "wake_up_time": "# \n7am", "daily_schedule": [{"type": "activity", "activity": "\uba85\uc0c1", "location": [2, 2], "duration": 20, "zone": "Joy_home"}, {"type": "movement", "path": [[2, 2], [2, 3]], "start_zone": "Joy_home", "end_zone": "Joy_home", "duration": 1}, {"type": "activity", "activity": "\uac04\ub2e8\ud55c \uc2a4\ud2b8\ub808\uce6d", "location": [2, 3], "duration": 10, "zone": "Joy_home"}, {"type": "activity", "activity": "\uc544\uce68 \uc2dd\uc0ac \ubc0f \ud558\ub8e8 \uacc4\ud68d \uc138\uc6b0\uae30", "location": [2, 3], "duration": 30, "zone": "Joy_home"}, {"type": "movement", "path": [[2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [15, 8], [15, 9], [14, 9], [13, 9], [12, 9]], "start_zone": "Joy_home", "end_zone": "Discussion Room", "duration": 22}, {"type": "activity", "activity": "\uc790\uc6d0\ubd09\uc0ac \ud65c\ub3d9 \ucc38\uc5ec", "location": [12, 9], "duration": 240, "zone": "Discussion Room"}, {"type": "movement", "path": [[12, 9], [13, 9], [14, 9], [15, 9], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8], [19, 9], [19, 10], [18, 10], [17, 10], [16, 10]], "start_zone": "Discussion Room", "end_zone": "Cafe", "duration": 13}, {"type": "activity", "activity": "\uc810\uc2ec \uc2dd\uc0ac", "location": [16, 10], "duration": 60, "zone": "Cafe"}, {"type": "movement", "path": [[16, 10], [17, 10], [18, 10], [19, 10], [19, 9], [19, 8], [18, 8], [17, 8], [16, 8], [15, 8], [15, 9], [14, 9], [13, 9], [12, 9]], "start_zone": "Cafe", "end_zone": "Discussion Room", "duration": 13}, {"type": "activity", "activity": "\uc0ac\ud68c\uc801 \ud65c\ub3d9 \uacc4\uc18d\ud558\uae30", "location": [12, 9], "duration": 240, "zone": "Discussion Room"}, {"type": "movement", "path": [[12, 9], [13, 9], [14, 9], [15, 9], [15, 8], [15, 7], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7], [10, 6], [10, 5], [10, 4], [10, 3], [9, 3], [8, 3], [7, 3], [6, 3], [5, 3], [4, 3], [3, 3]], "start_zone": "Discussion Room", "end_zone": "Joy_home", "duration": 21}, {"type": "activity", "activity": "\uc9d1\uc5d0 \ub3cc\uc544\uc640 \ub3c5\uc11c", "location": [3, 3], "duration": 60, "zone": "Joy_home"}, {"type": "movement", "path": [[3, 3], [3, 2]], "start_zone": "Joy_home", "end_zone": "Joy_home", "duration": 1}, {"type": "activity", "activity": "\ucc3d\uc791 \ud65c\ub3d9", "location": [3, 2], "duration": 60, "zone": "Joy_home"}, {"type": "movement", "path": [[3, 2], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8], [19, 9], [19, 10], [19, 11], [20, 11], [21, 11], [21, 10]], "start_zone": "Joy_home", "end_zone": "Restaurant", "duration": 28}, {"type": "activity", "activity": "\uc800\ub141 \uc2dd\uc0ac", "location": [21, 10], "duration": 60, "zone": "Restaurant"}, {"type": "movement", "path": [[21, 10], [21, 11], [20, 11], [19, 11], [19, 10], [19, 9], [19, 8], [18, 8], [17, 8], [16, 8], [15, 8], [15, 7], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7], [10, 6], [10, 5], [10, 4], [10, 3], [9, 3], [8, 3], [7, 3], [6, 3], [5, 3], [4, 3], [3, 3]], "start_zone": "Restaurant", "end_zone": "Joy_home", "duration": 27}, {"type": "activity", "activity": "\uc5ec\uc720\ub86d\uac8c TV \uc2dc\uccad", "location": [3, 3], "duration": 60, "zone": "Joy_home"}, {"type": "movement", "path": [[3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [15, 8], [15, 9], [14, 9], [13, 9], [12, 9]], "start_zone": "Joy_home", "end_zone": "Discussion Room", "duration": 21}, {"type": "activity", "activity": "\uce5c\uad6c\uc640 \ud1b5\ud654", "location": [12, 9], "duration": 30, "zone": "Discussion Room"}, {"type": "movement", "path": [[12, 9], [13, 9], [14, 9], [15, 9], [15, 8], [15, 7], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7], [10, 6], [10, 5], [10, 4], [10, 3], [9, 3], [8, 3], [7, 3], [6, 3], [5, 3], [4, 3], [3, 3], [2, 3]], "start_zone": "Discussion Room", "end_zone": "Joy_home", "duration": 22}, {"type": "activity", "activity": "\ud558\ub8e8 \uc815\ub9ac\ud558\uba70 \uba85\uc0c1", "location": [2, 3], "duration": 20, "zone": "Joy_home"}, {"type": "activity", "activity": "\ucde8\uce68 \uc900\ube44", "location": [2, 3], "duration": 10, "zone": "Joy_home"}, {"type": "activity", "activity": "\ucde8\uce68", "location": [2, 3], "duration": 480, "zone": "Joy_home"}]}, {"name": "Anger", "wake_up_time": "# \n7am", "daily_schedule": [{"type": "activity", "activity": "\uc77c\uc5b4\ub098\uc11c \uc2a4\ud2b8\ub808\uce6d", "location": [6, 11], "duration": 10, "zone": "Anger_home"}, {"type": "activity", "activity": "\ucee4\ud53c\ub97c \ub9c8\uc2dc\uba70 \ud558\ub8e8 \uacc4\ud68d \uc138\uc6b0\uae30", "location": [6, 11], "duration": 15, "zone": "Anger_home"}, {"type": "activity", "activity": "\ucd9c\uadfc \uc900\ube44", "location": [6, 11], "duration": 60, "zone": "Anger_home"}, {"type": "movement", "path": [[6, 11], [6, 10], [7, 10], [8, 10], [9, 10], [9, 9], [9, 8], [10, 8], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [15, 8], [15, 9], [14, 9], [13, 9], [12, 9], [11, 9]], "start_zone": "Anger_home", "end_zone": "Discussion Room", "duration": 19}, {"type": "activity", "activity": "\uc9c1\uc7a5\uc5d0 \ub3c4\ucc29 \ud6c4 \ub3d9\ub8cc\ub4e4\uacfc \uc778\uc0ac", "location": [11, 9], "duration": 10, "zone": "Discussion Room"}, {"type": "activity", "activity": "\uc5c5\ubb34 \uc9c4\ud589 \ubc0f \ub3d9\ub8cc\ub4e4\uacfc\uc758 \ud68c\uc758", "location": [11, 9], "duration": 120, "zone": "Discussion Room"}, {"type": "movement", "path": [[11, 9], [12, 9], [13, 9], [14, 9], [15, 9], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8], [19, 9], [19, 10], [19, 11], [20, 11], [21, 11], [21, 10]], "start_zone": "Discussion Room", "end_zone": "Restaurant", "duration": 15}, {"type": "activity", "activity": "\uc810\uc2ec \uba39\uae30", "location": [21, 10], "duration": 60, "zone": "Restaurant"}, {"type": "movement", "path": [[21, 10], [21, 11], [20, 11], [19, 11], [19, 10], [19, 9], [19, 8], [18, 8], [17, 8], [16, 8], [15, 8], [15, 9], [14, 9], [13, 9], [12, 9]], "start_zone": "Restaurant", "end_zone": "Discussion Room", "duration": 14}, {"type": "activity", "activity": "\uc5c5\ubb34 \uacc4\uc18d\ud558\uba70 \ub3d9\ub8cc\ub4e4\uacfc\uc758 \uac08\ub4f1 \ub300\ucc98", "location": [12, 9], "duration": 240, "zone": "Discussion Room"}, {"type": "movement", "path": [[12, 9], [13, 9], [14, 9], [15, 9], [15, 8], [15, 7], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7], [10, 8], [9, 8], [9, 9], [9, 10]], "start_zone": "Discussion Room", "end_zone": "Entrance", "duration": 14}, {"type": "activity", "activity": "\ud1f4\uadfc \ud6c4 \uc6b4\ub3d9(\uc870\uae45)", "location": [9, 10], "duration": 60, "zone": "Entrance"}, {"type": "movement", "path": [[9, 10], [10, 10], [10, 11], [10, 12], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13], [15, 13], [16, 13], [17, 13], [18, 13], [19, 13], [19, 12], [19, 11], [20, 11], [21, 11], [21, 10]], "start_zone": "Entrance", "end_zone": "Restaurant", "duration": 18}, {"type": "activity", "activity": "\uc800\ub141 \uba39\uae30", "location": [21, 10], "duration": 60, "zone": "Restaurant"}, {"type": "movement", "path": [[21, 10], [21, 11], [20, 11], [19, 11], [19, 10], [19, 9], [19, 8], [18, 8], [17, 8], [16, 8], [15, 8], [15, 9], [14, 9], [13, 9], [12, 9], [11, 9]], "start_zone": "Restaurant", "end_zone": "Discussion Room", "duration": 15}, {"type": "activity", "activity": "\uce5c\uad6c\ub4e4\uacfc \ub9cc\ub098\uc11c \ub300\ud654", "location": [11, 9], "duration": 120, "zone": "Discussion Room"}, {"type": "movement", "path": [[11, 9], [12, 9], [13, 9], [14, 9], [15, 9], [15, 8], [15, 7], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7], [10, 8], [9, 8], [9, 9], [9, 10], [8, 10], [7, 10], [6, 10]], "start_zone": "Discussion Room", "end_zone": "Anger_home", "duration": 18}, {"type": "activity", "activity": "\ud63c\uc790\uc11c \uc601\ud654 \ubcf4\uae30", "location": [6, 10], "duration": 120, "zone": "Anger_home"}, {"type": "movement", "path": [[6, 10], [6, 11]], "start_zone": "Anger_home", "end_zone": "Anger_home", "duration": 1}, {"type": "activity", "activity": "\ud63c\uc790\ub9cc\uc758 \uc2dc\uac04 \uac00\uc9c0\uba70 \ucc45 \uc77d\uae30", "location": [6, 11], "duration": 60, "zone": "Anger_home"}, {"type": "movement", "path": [[6, 11], [6, 12]], "start_zone": "Anger_home", "end_zone": "Anger_home", "duration": 1}, {"type": "activity", "activity": "\uc74c\uc545 \ub4e3\uae30", "location": [6, 12], "duration": 30, "zone": "Anger_home"}, {"type": "movement", "path": [[6, 12], [6, 11]], "start_zone": "Anger_home", "end_zone": "Anger_home", "duration": 1}, {"type": "activity", "activity": "\ucde8\uce68 \uc900\ube44", "location": [6, 11], "duration": 30, "zone": "Anger_home"}, {"type": "activity", "activity": "\uc7a0\uc790\uae30", "location": [6, 11], "duration": 480, "zone": "Anger_home"}]}, {"name": "Sadness", "wake_up_time": "# \n7am", "daily_schedule": [{"type": "activity", "activity": "\uc77c\uc5b4\ub098\uc11c \uc544\uce68 \uc2a4\ud2b8\ub808\uce6d", "location": [2, 10], "duration": 15, "zone": "Sadness_home"}, {"type": "movement", "path": [[2, 10], [2, 11]], "start_zone": "Sadness_home", "end_zone": "Sadness_home", "duration": 1}, {"type": "activity", "activity": "\uc870\uc6a9\ud55c \uc2dc\uac04\uc5d0 \ucc45 \uc77d\uae30", "location": [2, 11], "duration": 45, "zone": "Sadness_home"}, {"type": "movement", "path": [[2, 11], [2, 10]], "start_zone": "Sadness_home", "end_zone": "Sadness_home", "duration": 1}, {"type": "activity", "activity": "\uc77c\uae30 \uc4f0\uae30", "location": [2, 10], "duration": 30, "zone": "Sadness_home"}, {"type": "movement", "path": [[2, 10], [3, 10], [4, 10], [5, 10], [5, 9], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8], [19, 9], [19, 10], [18, 10], [17, 10], [16, 10], [15, 10]], "start_zone": "Sadness_home", "end_zone": "Cafe", "duration": 27}, {"type": "activity", "activity": "\uce5c\uad6c\uc640 \ub9cc\ub098\uc11c \uce74\ud398\uc5d0\uc11c \ube0c\ub7f0\uce58 \uc990\uae30\uae30", "location": [15, 10], "duration": 90, "zone": "Cafe"}, {"type": "movement", "path": [[15, 10], [16, 10], [17, 10], [18, 10], [19, 10], [19, 9], [19, 8], [18, 8], [17, 8], [16, 8], [15, 8], [15, 7], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7], [10, 8], [9, 8], [8, 8], [7, 8], [6, 8], [5, 8], [5, 9], [5, 10], [4, 10], [3, 10], [2, 10]], "start_zone": "Cafe", "end_zone": "Sadness_home", "duration": 27}, {"type": "activity", "activity": "\ud63c\uc790\uc11c \uc0b0\ucc45\ud558\uba70 \uc790\uc5f0 \uac10\uc0c1\ud558\uae30", "location": [2, 10], "duration": 60, "zone": "Sadness_home"}, {"type": "activity", "activity": "\uc9d1\uc5d0 \ub3cc\uc544\uc640 \uac10\uc815\uc801\uc778 \uc601\ud654 \uac10\uc0c1\ud558\uae30", "location": [2, 10], "duration": 120, "zone": "Sadness_home"}, {"type": "activity", "activity": "\uc800\ub141 \uc2dd\uc0ac \uc900\ube44\ud558\uace0 \uba39\uae30", "location": [2, 10], "duration": 60, "zone": "Sadness_home"}, {"type": "activity", "activity": "\uc74c\uc545\uc744 \ub4e4\uc73c\uba70 \ud3b8\uc548\ud55c \uc2dc\uac04 \ubcf4\ub0b4\uae30", "location": [2, 10], "duration": 90, "zone": "Sadness_home"}, {"type": "activity", "activity": "\ubcc4\uc744 \ubc14\ub77c\ubcf4\uba70 \uc0dd\uac01\uc5d0 \uc7a0\uae30\uae30", "location": [2, 10], "duration": 30, "zone": "Sadness_home"}, {"type": "activity", "activity": "\ucde8\uce68 \uc900\ube44 \ubc0f \uba85\uc0c1", "location": [2, 10], "duration": 15, "zone": "Sadness_home"}]}]


// 상호작용 이벤트 정의
const interactionEvents = {
  'Joy-Anger': {
    triggerDistance: 1, // 캐릭터간 거리가 1 이하일 때 이벤트 발생
    duration: 15, // 이벤트 지속 시간 (분)
    description: '갈등 해소 대화',
    priority: 1,
  },
  'Joy-Sadness': {
    triggerDistance: 1,
    duration: 20,
    description: '위로와 격려',
    priority: 2,
  },
  'Anger-Sadness': {
    triggerDistance: 1,
    duration: 25,
    description: '감정 공유',
    priority: 3,
  }
};


const CharacterVisualization = () => {

  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [characterPositions, setCharacterPositions] = useState({});
  const [currentActivities, setCurrentActivities] = useState({});
  const [activeInteractions, setActiveInteractions] = useState(new Set());
  const [interactionHistory, setInteractionHistory] = useState([]);


  // 두 캐릭터 간의 거리 계산
  const calculateDistance = (pos1, pos2) => {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + 
      Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  // calculateCharacterInfo를 useCallback으로 감싸고 의존성 추가
  const calculateCharacterInfo = useCallback((currentTime) => {
    const positions = {};
    const activities = {};

    characterData.forEach(character => {
      let elapsedTime = 0;
      let currentPosition = null;
      let currentActivity = null;
      let lastKnownPosition = null;
      let lastKnownActivity = null;

      // 상호작용 체크 로직 수정
      const isInInteraction = Array.from(activeInteractions).some(
        interaction => interaction.split('-').includes(character.name)
      );

      if (!isInInteraction) {
        for (const event of character.daily_schedule) {
          const eventEnd = elapsedTime + event.duration;
          
          if (event.type === 'activity') {
            lastKnownPosition = event.location;
            lastKnownActivity = event.activity;
          } else if (event.type === 'movement') {
            lastKnownPosition = event.path[event.path.length - 1];
            lastKnownActivity = "이동 중";
          }

          if (currentTime >= elapsedTime && currentTime <= eventEnd) {
            if (event.type === 'activity') {
              currentPosition = event.location;
              currentActivity = event.activity;
            } else if (event.type === 'movement') {
              const progress = (currentTime - elapsedTime) / event.duration;
              const pathIndex = Math.min(
                Math.floor(progress * event.path.length),
                event.path.length - 1
              );
              currentPosition = event.path[pathIndex];
              currentActivity = "이동 중";
            }
            break;
          }
          
          elapsedTime = eventEnd;
        }
      } else {
        // 상호작용 중일 때는 현재 위치 유지
        currentPosition = lastKnownPosition;
        
        // 진행 중인 상호작용 찾기
        activeInteractions.forEach(interaction => {
          if (interaction.includes(character.name)) {
            currentActivity = interactionEvents[interaction].description;
          }
        });
      }

      if (!currentPosition && lastKnownPosition) {
        currentPosition = lastKnownPosition;
        currentActivity = "휴식 중";
      }

      if (currentPosition) {
        positions[character.name] = currentPosition;
        activities[character.name] = currentActivity;
      }
    });

    // positions이 업데이트된 후에 상호작용 체크
    const newInteractions = checkInteractions(positions);
    
    return { positions, activities };
  }, [activeInteractions]);

  // useEffect 수정
  useEffect(() => {
    const { positions, activities } = calculateCharacterInfo(time);
    setCharacterPositions(positions);
    setCurrentActivities(activities);
  }, [time, calculateCharacterInfo]);

  // checkInteractions 함수 수정
  const checkInteractions = useCallback((positions) => {
    const newInteractions = new Set();
    
    // 모든 가능한 캐릭터 쌍에 대해 검사
    const characters = Object.keys(positions);
    for (let i = 0; i < characters.length; i++) {
      for (let j = i + 1; j < characters.length; j++) {
        const char1 = characters[i];
        const char2 = characters[j];
        const interactionKey = `${char1}-${char2}`;
        
        if (interactionEvents[interactionKey]) {
          const distance = calculateDistance(positions[char1], positions[char2]);
          
          if (distance <= interactionEvents[interactionKey].triggerDistance) {
            console.log(`Interaction detected: ${interactionKey}, distance: ${distance}`);
            newInteractions.add(interactionKey);
            
            // 새로운 상호작용 기록
            if (!activeInteractions.has(interactionKey)) {
              setInteractionHistory(prev => [...prev, {
                time: formatTime(time),
                event: interactionEvents[interactionKey].description,
                characters: [char1, char2]
              }]);
            }
          }
        }
      }
    }
    
    setActiveInteractions(newInteractions);
    return newInteractions;
  }, [activeInteractions, time]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          return newTime > 1440 ? 0 : newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setTime(0);
  };

  const characterColors = {
    Joy: '#FFD700',
    Anger: '#FF4136',
    Sadness: '#0074D9'
  };

  return (
    <div className="w-full h-full p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">캐릭터 일과 시각화</h1>
        <div className="text-xl font-mono">{formatTime(time)}</div>
      </div>

      
      <div className="flex justify-center gap-4 mb-4">
        {isPlaying ? (
          <button onClick={handlePause} className="p-2 bg-red-500 text-white rounded">
            <Pause size={24} />
          </button>
        ) : (
          <button onClick={handlePlay} className="p-2 bg-green-500 text-white rounded">
            <Play size={24} />
          </button>
        )}
        <button onClick={handleReset} className="p-2 bg-blue-500 text-white rounded">
          <SkipBack size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {Object.entries(currentActivities).map(([name, activity]) => (
          <div key={name} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: characterColors[name] }}
            />
            <span className="font-medium">{name}</span>
            <span className="text-sm text-gray-600">: {activity}</span>
          </div>
        ))}
      </div>

      <div className="relative border border-gray-200" 
           style={{ width: `${TILE_WIDTH * mapMatrix[0].length}px`, 
                    height: `${TILE_HEIGHT * mapMatrix.length}px` }}>
        {mapMatrix.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex" style={{ height: `${TILE_HEIGHT}px` }}>
            {row.map((cell, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={`border ${cell === 1 ? 'bg-gray-200' : 'bg-white'}`}
                style={{ 
                  width: `${TILE_WIDTH}px`,
                  height: `${TILE_HEIGHT}px`
                }}
              />
            ))}
          </div>
        ))}
        
        {Object.entries(characterPositions).map(([name, position]) => (
          <div
            key={name}
            className="absolute w-6 h-6 rounded-full transition-all duration-100 flex items-center justify-center shadow-lg"
            style={{
              backgroundColor: characterColors[name],
              left: `${position[1] * TILE_WIDTH + TILE_WIDTH/2}px`,
              top: `${position[0] * TILE_HEIGHT + TILE_HEIGHT/2}px`,
              transform: 'translate(-50%, -50%)'
            }}
            title={name}
          >
            <span className="text-xs font-bold text-black">
              {name.charAt(0)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        * 각 캐릭터는 첫 글자로 표시됩니다. (J: Joy, A: Anger, S: Sadness)
        <br />
        * 캐릭터의 일정이 끝나면 마지막 위치에서 "휴식 중" 상태가 됩니다.
      </div>



      {/* 상호작용 히스토리 표시 추가 */}
      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-bold mb-2">상호작용 기록</h2>
        <div className="max-h-40 overflow-y-auto">
          {interactionHistory.map((interaction, index) => (
            <div key={index} className="mb-2 text-sm">
              <span className="font-mono">{interaction.time}</span> - 
              <span className="font-medium"> {interaction.characters.join(' & ')}</span>: 
              {interaction.event}
            </div>
          ))}
        </div>
      </div>


      <div className="mt-4 border-t pt-4">
  <h2 className="text-lg font-bold mb-2">디버그 정보</h2>
  <div className="text-sm space-y-2">
    <div>현재 시간: {formatTime(time)}</div>
    <div>활성 상호작용: {Array.from(activeInteractions).join(', ') || '없음'}</div>
    <div>캐릭터 위치:</div>
    {Object.entries(characterPositions).map(([name, pos]) => (
      <div key={name}>
        {name}: [{pos.join(', ')}]
      </div>
    ))}
  </div>
</div>
      
    </div>

    
  );
};

export default CharacterVisualization;