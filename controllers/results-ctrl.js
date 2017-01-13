app.controller('resultsCtrl', function($scope, $timeout){
	firebase.database().ref('test/technical').on('value', function(snapshot){
		$timeout(function(){
			calculateScore(snapshot.val());
		},0);
	});

	$scope.correctAnswers = [1, 1, 3, 2, 3, 1, 3, 1, 3, 0, 1, 2, 3, 0,  3, 0, 1, 1, 2, 1, 1, 0, 2, 3, 2, 2, 1, 2, 3, 1, 0, 2, 0, 1, 0, 1, 0, 0, 0, 0, 2, 2, 0, 1, 0, 2, 1, 0, 1, 2, 0];
	$scope.responses = [];

	function calculateScore(answers){
		$scope.responses = [];
		for(key in answers){
			var score
			var aptiScore = 0;
			var negativeAptiScore = 0;
			var progScore = 0;
			var negativeProgScore = 0;
			var mlScore = 0;
			var negativeMlScore = 0;
			for(var i = 0; i < 51; i++){
				if(answers[key].answers[i] != 'Not answered'){
					if(i < 10){
						if(parseInt(answers[key].answers[i]) == $scope.correctAnswers[i]){
							aptiScore += 1;
						} else {
							negativeAptiScore -= 1;
						}						
					} else if(i>=10 && i < 35) {
						if(parseInt(answers[key].answers[i]) == $scope.correctAnswers[i]){
							progScore += 1;
						} else {
							negativeProgScore -= 1;
						}
					} else {
						if(parseInt(answers[key].answers[i]) == $scope.correctAnswers[i]){
							mlScore += 1;
						} else {
							negativeMlScore -= 1;
						}
					}
				}
			}
			answers[key].score = aptiScore+negativeAptiScore+progScore+negativeProgScore;
			answers[key].aptiScore = aptiScore;
			answers[key].negativeAptiScore = negativeAptiScore;
			answers[key].progScore = progScore;
			answers[key].negativeProgScore = negativeProgScore;
			answers[key].mlScore = mlScore;
			answers[key].negativeMlScore = negativeMlScore;
			$scope.responses.push(answers[key]);
		}

	}
})