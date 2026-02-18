
const pushBodyweight = [
    'push-up',
    'dip',
    'bench-dip',
    'handstand pushup'
];
const legWeighted = [
    'squat',
    'lunges',
    'deadlift',
    'glute bridges',
    
];
const cardio = [
    'run',
    'row',
];

const getRandomItem = (arr) =>{
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
};


const workout = {
    bodyweight:getRandomItem(pushBodyweight),
    weightslifting:getRandomItem(legWeighted),
    cardio:getRandomItem(cardio)
};


function generateWorkout() {
    document.getElementById('move1').textContent = getRandomItem(pushBodyweight);
    document.getElementById('move2').textContent = getRandomItem(legWeighted);
    document.getElementById('move3').textContent = getRandomItem(cardio);
}
generateWorkout()


const pullBodyweight = [
    'pull-up',
    'row',
]
const legBodyweight = [
    'squat',
    'lunges',
    'split squats',
    'glute bridges',

]

const pushYoga = [
    'dive-bomp pushup',
    'cobra pushup',
    'downward facind dog'
]

const legYoga = [
    'warrior ii pose',
    'Triangle Pose',
    'Half Moon Pose',
    'glute bridges',

]


const pushWeighted = [
    'bench-press',
    'shoulder press'
]
const pullWeighted = [
    'lat pull down',
    'bentover row',
]


const pushRecWeighted = [
    'bench-press',
    'shoulder press'
]
const pullRecWeighted = [
    'lat pull down',
    'bentover row',
]
const legRecWeighted = [
    'squat',
    'lunges',
    'deadlift'
]

const cardioRec = [
    'walk'
]


const bodyweightCardio = [
    'burpees',
    'jumping jacks',
    'jump rope'
]

let randomNum = Math.floor(Math.random()*pushBodyweight.length)

// 3 movements on the first day
// 2 movements on the second day
// 1 movement on the 3rd day
// 2 movements on the 4th day
// 1 movement on the 5th day
// Off Day
// Off day
// light weight for for day two and some day 5s
// only go heavy on w3
// This will also be 3 weeks exercise, then one week recovery exercise
// 
// bps 1.1 = bw,w,c
// bpl 1.2 = bw,w
// bl  1.3 = bw - with weight
// bps 1.4 = bw,c
// bl  1.5 = bw - many reps

// w     1 = w,bw,c
// w     2 = w,bw
// w     3 = w heavy weight
// w     4 = w,c
// w     5 = w - many reps
     
// c     1 = c,bw,w
// c     2 = c,bw
// c     3 = c - speed - sprint
// c     4 = c,w
// c     5 = c - distance for time

// Recovery 1.1 = recbw,recw,recar
// Recovery 1.2 = recbw,recw
// Recovery 1.3 = recbw
// Recovery 1.4 = recbw,recar
// Recovery 1.5 = recbw


// bps 2.1 = bw,w,c
// bpl 2.2 = bw,w
//  bl 2.3 = bw - many reps
// bps 2.4 = bw,c
//  bl 2.5 = bw - with weight

// w   2.1 = w,bw,c
// w   2.2 = w,bw
// w   2.3 = w many reps
// w   2.4 = w,c
// w   2.5 = w - w/weight
  
// c   2.1 = c,bw,w
// c   2.2 = c,bw
// c   2.3 = c - distance
// c   2.4 = c,w
// c   2.5 = c - speed sprints

// Recovery 2.1 = recbw,recw,recar
// Recovery 2.2 = recbw,recw
// Recovery 2.3 = recbw
// Recovery 2.4 = recbw,recar
// Recovery 2.5 = recbw







