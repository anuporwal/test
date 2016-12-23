app.controller('resultsCtrl', function($scope, $timeout){
	firebase.database().ref('test/technical').once('value', function(snapshot){
		$timeout(function(){
			calculateScore(snapshot.val());
		},0);
	});

	$scope.correctAnswers = [1, 1, 3, 2, 3, 1, 3, 1, 3, 0, 1, 2, 3, 0,  3, 0, 1, 1, 2, 1, 1, 0, 2, 3, 2, 2, 1, 2, 3, 1, 0, 2, 0, 1, 0];;
	$scope.responses = [];

	function calculateScore(answers){
		for(key in answers){
			var score
			var aptiScore = 0;
			var negativeAptiScore = 0;
			var progScore = 0;
			var negativeProgScore = 0;
			for(var i = 0; i < 35; i++){
				if(answers[key].answers[i] != 'Not answered'){
					if(i < 10){
						if(parseInt(answers[key].answers[i]) == $scope.correctAnswers[i]){
							console.log('correct', i);
							aptiScore += 1;
						} else {
							negativeAptiScore -= 1;
							console.log('incorrect', i);
						}						
					} else {
						if(parseInt(answers[key].answers[i]) == $scope.correctAnswers[i]){
							console.log('correct', i);
							progScore += 1;
						} else {
							negativeProgScore -= 1;
							console.log('incorrect', i);
						}
					}
				}
			}
			answers[key].score = aptiScore+negativeAptiScore+progScore+negativeProgScore;
			answers[key].aptiScore = aptiScore;
			answers[key].negativeAptiScore = negativeAptiScore;
			answers[key].progScore = progScore;
			answers[key].negativeProgScore = negativeProgScore;
			console.log(answers[key]);
			$scope.responses.push(answers[key]);
		}

	}
})