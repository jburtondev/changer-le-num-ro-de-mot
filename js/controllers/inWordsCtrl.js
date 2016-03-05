(function(angular) {
    'use strict';
    App = angular.module('App', []);

    App.controller('InWordsController', ['$scope', function($scope) {

        $scope.userInput;
        $scope.wordOutput = "";

        // Restricts output to thousands
        $scope.restrictLargeNumbers = function(num) {
            if ((num === num.toString()).length > 4) {
                alert("Number is too large, replace with a number up to a thousand (e.g, 1 - 1000)");
                location.reload();
            }
        };

        //If user hasn't input a number, refresh page
        $scope.checkIfNoNumber = function(tempNum) {
            if ($scope.userInput === undefined) {
                alert("Please input number");
                location.reload();
            }
            return false;
        };

        //Uses extracted data to construct string
        $scope.constructStringFromNumber = function(string) {
            string += (self.tempNum[3] != 0) ? (App.Data.ones[Number(self.tempNum[3])] || App.Data.tens[self.tempNum[3][0]] + ' ' + App.Data.ones[self.tempNum[3][1]]) + 'thousand ' : '';
            string += (self.tempNum[4] != 0) ? (App.Data.ones[Number(self.tempNum[4])] || App.Data.tens[self.tempNum[4][0]] + ' ' + App.Data.ones[self.tempNum[4][1]]) + 'hundred ' : '';
            string += (self.tempNum[5] != 0) ? ((string != '') ? 'and ' : '') + (App.Data.ones[Number(self.tempNum[5])] || App.Data.tens[self.tempNum[5][0]] + ' ' + App.Data.ones[self.tempNum[5][1]]) : '';
            $scope.wordOutput = string; //Put constructed string onto screen
        };

        //Extracts data from number which is then used to construct the string
        $scope.extractDataFromInput = function(num) {
            self.tempNum = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        };

        // Converts number to word and outputs into scope
        $scope.convertToWord = function(num) {
            var tempNum;
            var self = this;
            $scope.checkIfNoNumber();
            $scope.restrictLargeNumbers(num);
            $scope.extractDataFromInput(num);
            $scope.constructStringFromNumber('');
        };

    }]);

})(window.angular);
