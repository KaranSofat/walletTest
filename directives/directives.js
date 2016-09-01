define(['app'], function(app) {
app.directive('phoneNumber', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, el, atts, ngModel) {
      
      /* called when model is changed from the input element */
      ngModel.$parsers.unshift(function(viewValue) {
        
        var numbers = viewValue.replace(/\D/g, ''),
            char = {0:'(',3:') ',6:' - '};
        numbers = numbers.slice(0, 10);
        viewValue = '';
        
        for (var i = 0; i < numbers.length; i++) {
            viewValue += (char[i]||'') + numbers[i];
        }
        
        // set the input to formatted value
        el.val(viewValue);
        
        return viewValue;
      });

      /* called when model is changed outside of the input element */
      ngModel.$formatters.push(function(modelValue) {
        return modelValue; 
      });
      
      /* called when the model changes, if validation fails the model value won't be assigned */
      ngModel.$validators.phone = function(modelValue, viewValue) {
        if (modelValue) {
          return modelValue.match(/\d/g).length === 10; 
        } else {
          return false;
        }
      }
      
    }
  }
});
app.directive('currencyInput', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {

            return ctrl.$parsers.push(function(inputValue) {
                var inputVal = element.val();

                //clearing left side zeros
                while (inputVal.charAt(0) == '0') {
                    inputVal = inputVal.substr(1);
                }

                inputVal = inputVal.replace(/[^\d.\',']/g, '');

                var point = inputVal.indexOf(".");
                if (point >= 0) {
                    inputVal = inputVal.slice(0, point + 3);
                }

                var decimalSplit = inputVal.split(".");
                var intPart = decimalSplit[0];
                var decPart = decimalSplit[1];

                intPart = intPart.replace(/[^\d]/g, '');
                if (intPart.length > 3) {
                    var intDiv = Math.floor(intPart.length / 3);
                    while (intDiv > 0) {
                        var lastComma = intPart.indexOf(",");
                        if (lastComma < 0) {
                            lastComma = intPart.length;
                        }

                        if (lastComma - 3 > 0) {
                            intPart = intPart.slice(0, lastComma - 3) + "," + intPart.slice(lastComma - 3);
                        }
                        intDiv--;
                    }
                }

                if (decPart === undefined) {
                    decPart = "";
                }
                else {
                    decPart = "." + decPart;
                }
                var res = intPart + decPart;

                if (res != inputValue) {
                    ctrl.$setViewValue(res);
                    ctrl.$render();
                }

            });

        }
    };
});
app.directive('moveFocus', function() {
    function getCaretPosition(elem) {
      // Internet Explorer Caret Position
      if (document.selection && document.selection.createRange) {
        var range = document.selection.createRange();
        var bookmark = range.getBookmark();
        return bookmark.charCodeAt(2) - 2;
      }

      // Firefox Caret Position
      return elem.setSelectionRange && elem.selectionStart;
    }

    return {
      restrict: 'A',
      link: function(scope, elem, attr) {
        var tabindex = parseInt(attr.tabindex);
        var maxlength = parseInt(attr.maxlength);

        elem.on('input, keydown', function(e) {
          var val = elem.val(),
              cp, 
              code = e.which || e.keyCode;

          if (val.length === maxlength && [8, 37, 38, 39, 40, 46].indexOf(code) === -1) {
            var next = document.querySelectorAll('#input' + (tabindex + 1));
            next.length && next[0].focus();
            return;
          }

          cp = getCaretPosition(this);
          if ((cp === 0 && code === 46) || (cp === 1 && code === 8)) {
            var prev = document.querySelectorAll('#input' + (tabindex - 1));
            e.preventDefault();
            elem.val(val.substring(1));
            prev.length && prev[0].focus();
            return;
          }
        });
      }
    };
  });

})