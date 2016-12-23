app.controller('homeCtrl', function($scope, $timeout){
	$scope.currentStep = 1;
	$scope.attempted  = 0;
	$scope.total = 0;
	$scope.testSubmitted = false;
	var stopped;
	$scope.min = 0;
	$scope.seconds = 0;
	$scope.showSecondZero;
	$scope.showMinZero;
	$scope.submittedTest = false;
	$scope.showClock = false;

	$scope.technicalQuestions = [
		{
			ques: 'Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds. The ratio of their speeds is:',
			options: ['1 : 3', '3 : 2', '3 : 4', 'None of these'],
		},
		{
			ques: 'A trader mixes 26 kg of rice at Rs. 20 per kg and 30 kg of rice of other variety at Rs. 36 per kg and sells the mixture at Rs. 30 per kg. His profit percent is:',
			options: ['No profit, no loss', '5%', '8%', '10%'],
		},
		{
			ques: 'To fill a tank, 25 buckets of water is required. How many buckets of water will be required to fill the same tank if the capacity of the bucket is reduced to two-fifth of its present ?',
			options: ['10', '35', '65', 'None of these']
		},
		{
			ques: 'The next number in the series 7, 26, 63, 124, 215, 342, … is:',
			options: ['481', '435', '511', '391']
		},
		{
			ques: "In how many different ways can the letters of the word 'CORPORATION' be arranged so that the vowels always come together?",
			options: ['1440', '2880', '5760', '50400']
		},
		{
			ques: ' Which code should be replaced in the question mark?',
			options: ['IBVJ', 'HCWI', 'FZSD', 'ICWA'],
			image: '/images/q6.png'
		},
		{
			ques: 'A number consists of 3 digits whose sum is 10. The middle digit is equal to the sum of the other two and the number will be increased by 99 if its digits are reversed. The number is:',
			options: ['145', '352', '370', '253']
		},
		{
			ques: 'Let N be the greatest number that will divide 1305, 4665 and 6905, leaving the same remainder in each case. Then sum of the digits in N is:',
			options: ['8', '4', '6', '5']
		},
		{
			ques: 'Three numbers which are co-prime to each other are such that the product of the first two is 551 and that of the last two is 1073. The sum of the three numbers is:',
			options: ['89', '81', '75', '85']
		},
		{
			ques: 'A display of cans on a grocery shelf consists of 20 cans on the bottom, 18 cans in the next row, and so on in an arithmetic sequence, until the top row has 4 cans.  How many cans, in total, are in the display?',
			options: ['108', '112', '216', '432']
		},
		{
			ques: 'Let A be a square matrix of size n x n. Consider the following program. What is the expected output?',
			options: ['Transpose of matrix A', 'The matriz A itself', 'Adding 100 to the upper diagonal elements and subtracting 100 from diagonal elements of A', 'None of the above']
		},
		{
			ques: 'Which of the following statements is/are TRUE for an undirected graph?',
			subques: ['P: Number of odd degree vertices is even','Q: Sum of degrees of all vertices is even'],
			options: ['P only', 'Q only', 'Both P and Q', 'Neither P nor Q']
		},
		{
			ques: 'Consider the C function given below. Assume that the array listA contains n (> 0) elements, sorted in ascending order.',
			subques: ['Which one of the following statements about the function ProcessArray is CORRECT?'],
			options: ['It will run into an infinite loop when x is not in listA.', 'It will always find the maximum element in listA.', 'It will return -1 even when x is present in listA.', 'It is an implementation of binary search.'],
			image: '/images/q13.png'
		},
		{
			ques: 'Consider the following operation along with Enqueue and Dequeue operations onqueues, where k is a global parameter',
			subques: ['What is the worst case time complexity of a sequence of n MultiDequeue() operations on an initially empty queue?'],
			options: ['Θ(n)', 'Θ(n+k)', 'Θ(nk)', 'Θ(n^2)'],
			image: '/images/q14.png'
		},
		{
			ques: 'The preorder traversal sequence of a binary search tree is 30, 20, 10, 15, 25, 23, 39, 35, 42. Which one of the following is the postorder traversal sequence of the same tree?',
			options: ['10, 20, 15, 23, 25, 35, 42, 39, 30', '15, 20, 10, 23, 25, 42, 35, 39, 30', '15, 10, 25, 23, 20, 42, 35, 39, 30', '15, 10, 23, 25, 20, 35, 42, 39, 30']
		},
		{
			ques: 'What is the output of this C code?',
			options: ['Compilation error', '0', 'Undefined', '8'],
			image: '/images/q16.png'
		},
		{
			ques: 'Comment on the output of the following code: ',
			options: ['It will print a', 'Runtime error', 'It will print 0', 'Compilation error'],
			image: '/images/q17.png'
		},
		{
			ques: 'Is initialisation mandatory for local static variables?',
			options: ['Yes', 'No', 'Depends on compiler', 'None of these']
		},
		{
			ques: 'Which of the following cannot be a structure member?',
			options: ['Another structure', 'Array', 'Function', 'Pointer']
		},
		{
			ques: 'What is the output of this C code?',
			options: ['l', 'o', 'e', 'Compilation error'],
			image: '/images/q20.png'
		},
		{
			ques: 'On which if the following operator can % operator NOT be used ? ',
			options: ['int variable', 'float variable', 'int constant', 'All of the above']
		},
		{
			ques: 'The postfix expression for *+ab-cd is?',
			options: ['ab+cd-*', 'abcd+-*', 'ab+cd*-', 'ab+-cd*']
		},
		{
			ques: 'Does this compile without error?',
			options: ['Yes', 'No', 'Depends on the C standard implemented by compilers', 'None of these'],
			image: '/images/q23.png'
		},
		{
			ques: 'Comment on the output of this C code?',
			options: ['No error, output is 1111', 'No error, output is 1', 'Compile time error, no break statements', 'Compile time error, d) case label outside switch statement'],
			image: '/images/q24.png'
		},
		{
			ques: 'Output of following program?',
			options: ['1', '2', '6', 'Runtime error'],
			image: '/images/q25.png'
		},
		{
			ques: 'What will happen if in a C program you assign a value to an array element whose subscript exceeds the size of array?',
			options: ['The element will be set to 0.', 'The compiler would report an error.', 'The program may crash if some important data gets overwritten.', 'The array size would appropriately grow.']
		},
		{
			ques: 'What does the following declaration mean?',
			subques: ['int (*ptr)[10];'],
			options: ['ptr is array of pointers to 10 integers', 'ptr is a pointer to an array of 10 integers', 'ptr is an array of 10 integers', 'ptr is an pointer to array']
		},
		{
			ques: 'In C, if you pass an array as an argument to a function, what actually gets passed?',
			options: ['Value of elements in array', 'First element of the array', 'Base address of the array', 'Address of the last element of array']
		},
		{
			ques: 'Can you combine the following two statements into one?',
			subques: ['char *p;', 'p = (char*) malloc(100);'],
			options: ['char p = *malloc(100);', 'char *p = (char) malloc(100);', 'char *p = (char *)(malloc*)(100);', 'char *p = (char*)malloc(100);']
		},
		{
			ques: 'What is the output of this C code?',
			options: ['0', '4', 'Compile time error', 'Undefined'],
			image: '/images/q30.png'
		},
		{
			ques: 'What is the output of this C code?',
			options: ['1', 'Compile time error', 'Some garbage value', 'Undefined variable'],
			image: '/images/q31.png'
		},
		{
			ques: 'Which of the following declaration is illegal?',
			options: ['int a = 0, b = 1, c = 2; int array[3] = {a, b, c};', 'int size = 3; int array[size];', 'int size = 3; int array[size] = {1, 2, 3};', 'All of the mentioned']
		},
		{
			ques: 'What is the output of this C code?',
			options: ['45 65', '65 45', '45', 'Compilation error'],
			image: '/images/q33.png'
		},
		{
			ques: 'What is the output of this C code?',
			options: ['Compile time error', '1.000000', '2.302585', 'None of the mentioned'],
			image: '/images/q34.png'
		},
		{
			ques: 'What is the output of this C code?',
			options: ['2 2', '2 97', 'Undefined behaviour', 'Segmentation fault'],
			image: '/images/q35.png'
		}
	];
	if(checkLocalStorage('user')){
		$scope.user = getLocalStorage('user');
		// console.log($scope.user);
	}
	if(checkLocalStorage('currentStep')){
		$scope.currentStep = getLocalStorage('currentStep');
		if($scope.currentStep > 2 && $scope.currentStep != 4){
			initializeQuiz();
		}
		if($scope.currentStep == 4){
			$scope.currentStep = 1;
			setLocalStorage('currentStep', 1);
		}
	}

	if($scope.currentStep == 3){
		if(checkLocalStorage('time')){
			var time = getLocalStorage('time');
			$scope.min = time.min;
			$scope.seconds = time.seconds;
			// console.log('84');
			startTimer();
		} else if($scope.currentStep == 3){
			// console.log('87');
			startTimer();
		}
	}

	$scope.startTest = function(){
		if($scope.user.testCode == 'ROOF1234'){
			$scope.currentStep = 2;

			// To be removed in case the marketing option is also available
			$scope.user.testType = 'technical';
			setLocalStorage('currentStep', 2);
			setLocalStorage('user', $scope.user);
		} else {
			swal('Incorrect Test Code', 'The code you have entered is incorrect', 'error');
		}
	}

	$scope.beginTest = function(){
		$scope.currentStep = 3;
		setLocalStorage('currentStep', 3);
		setLocalStorage('user', $scope.user);
		initializeQuiz();
		// console.log('106');
		startTimer();
	}

	$scope.submitTest = function(){
		$scope.submittedTest = true;
		$timeout.cancel(stopped);
        swal({
          title: "Submitting Answers",
          text: "Please wait...",
          imageUrl: "https://d1ow200m9i3wyh.cloudfront.net/img/assets/common/images/loader.gif",
          showConfirmButton: false
        });
		var updates={};
		var userData = {};
		for(var i = 0; i < $scope.allQuestions.length; i++){
			if($scope.allQuestions[i].ans){
				for(key in $scope.allQuestions[i].options){
					if($scope.allQuestions[i].options[key] == $scope.allQuestions[i].ans){
						userData[i] = key;
					}
				}
			} else {
				userData[i] = 'Not answered';
			}
		}
		// console.log(userData);
		var pushId = firebase.database().ref('test/'+$scope.user.testType).push().key;
		var finalData = {
			userInfo: $scope.user,
			answers: userData
		}
		updates['test/'+$scope.user.testType+'/'+pushId]  = finalData;
		// console.log(updates);
		firebase.database().ref().update(updates).then(function(){
			$timeout(function(){
				deleteLocalStorage('user');
				deleteLocalStorage('questions');
				deleteLocalStorage('time');
				$scope.currentStep = 4;
				setLocalStorage('currentStep', 4);
				swal('Submitted', 'Your answers were successfully submitted', 'success');
			}, 1000);
		}, function(error){
			swal('Error', 'Error submitting answers, please submit again', 'error');
			$scope.submittedTest = false;
		});
	}

	function stopTimer(){
   		$timeout.cancel(stopped);
   		$scope.submitTest();
    } 

	function startTimer(){
		$scope.showClock = true;
		stopped = $timeout(function() {
			if($scope.seconds == 59){
				$scope.seconds = 0;
				$scope.showSecondZero = true;
				$scope.min = $scope.min+1;
			} else {
				$scope.seconds = $scope.seconds+1;
				if($scope.seconds< 10){
					$scope.showSecondZero = true;
				} else {
					$scope.showSecondZero = false;
				}
			}
			if($scope.min < 10){
				$scope.showMinZero = true;
			} else {
				$scope.showMinZero = false;
			}

			var time = {
				min: $scope.min,
				seconds: $scope.seconds
			}
			setLocalStorage('time', time);
			if($scope.min == 40){
				stopTimer();
			} else {
				startTimer(); 
			}
		}, 1000);
	}

	function initializeQuiz(){
		if(checkLocalStorage('questions')){
			$scope.allQuestions = getLocalStorage('questions');
			// console.log($scope.allQuestions);
			$scope.total = $scope.allQuestions.length;
			attemptedCount();
		} else {
			if($scope.user.testType == 'marketing'){
				$scope.allQuestions = $scope.marketingQuestions;
			} else {
				$scope.allQuestions = $scope.technicalQuestions;
			}
			setLocalStorage('questions', $scope.allQuestions);
			// console.log($scope.allQuestions);
			$scope.total = $scope.allQuestions.length;
		}
	}

	function attemptedCount(){
		$scope.attempted = 0;
		for(var i=0; i < $scope.allQuestions.length; i++){
			if($scope.allQuestions[i].ans){
				$scope.attempted += 1;
			}
		}
	}

	$scope.markAnswer  = function(ques, val){
		// console.log(ques, val);
		var index = $scope.allQuestions.indexOf(ques);
		$scope.allQuestions[index].ans = val;
		setLocalStorage('questions', $scope.allQuestions);
		attemptedCount();
	}

	$scope.unmarkAnswer  = function(ques, val){
		// console.log(ques, val);
		var index = $scope.allQuestions.indexOf(ques);
		delete $scope.allQuestions[index].ans;
		setLocalStorage('questions', $scope.allQuestions);
		attemptedCount();
	}

});

function checkLocalStorage(name){
    if (localStorage.getItem(name) === null) {
        return false;
    } else {
        return true;
    }
}

function setLocalStorage(name, value){
    localStorage.setItem(name, JSON.stringify(value));
}

function deleteLocalStorage(name){
    localStorage.removeItem(name);
}

function getLocalStorage(name){
    return JSON.parse(localStorage.getItem(name));
}