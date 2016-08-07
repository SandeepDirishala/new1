/* modified from https://github.com/dpiccone/ng-pageslide
 * - added params psHeight, psWidth, psLeft, psTop, psRight and psBottom
 */

angular.module('pageslide-directive', [])

.directive('pageslide', ['$document', '$timeout',
    function ($document, $timeout) {
        var defaults = {};

        return {
            restrict: 'EAC',
            transclude: false,
            scope: {
                psOpen: '=?',
                psAutoClose: '=?',
                psSide: '@',
                psSpeed: '@',
                psClass: '@',
                psSize: '@',
				psHeight: '@',
				psWidth: '@',
				psLeft: '@',
				psTop: '@',
				psRight: '@',
				psBottom: '@',
                psZindex: '@',
                psSqueeze: '@',
                psCloak: '@',
                psPush: '@',
                psContainer: '@',
                psKeyListener: '@',
                psBodyClass: '@'
            },
            link: function ($scope, el, attrs) {

                /* Inspect */

                //console.log($scope);
                //console.log(el);
                //console.log(attrs);

                var param = {};

                param.side = $scope.psSide || 'right';
                param.speed = $scope.psSpeed || '0.5';
                param.size = $scope.psSize || '300px';
                param.height = $scope.psHeight || '100%';
                param.width = $scope.psWidth || '100%';
                param.left = $scope.psLeft || '0px';
                param.top = $scope.psTop || '0px';
                param.right = $scope.psRight || '0px';
                param.bottom = $scope.psBottom || '0px';
                param.zindex = $scope.psZindex || 1000;
                param.className = $scope.psClass || 'ng-pageslide';
                param.squeeze = Boolean($scope.psSqueeze) || false;
                param.push = Boolean($scope.psPush) || false;
                param.container = $scope.psContainer || false;
                param.keyListener = Boolean($scope.psKeyListener) || false;
                param.bodyClass = $scope.psBodyClass || false;

                el.addClass(param.className);

                /* DOM manipulation */

                var content = null;
                var slider = null;
                var body = param.container ? document.getElementById(param.container) : document.body;

                // NOTE: if ps-body-class='true', the body of the page will be dynamically updated 

                function setBodyClass(value){
                    if (param.bodyClass) {
                        var bodyClass = param.className + '-body';
                        var bodyClassRe = new RegExp(' ' + bodyClass + '-closed| ' + bodyClass + '-open');
                        body.className = body.className.replace(bodyClassRe, '');
                        body.className += ' ' + bodyClass + '-' + value;
                    }
                }

                setBodyClass('closed');

                slider = el[0];

                // Check for div tag
                if (slider.tagName.toLowerCase() !== 'div' &&
                    slider.tagName.toLowerCase() !== 'pageslide')
                    throw new Error('Pageslide can only be applied to <div> or <pageslide> elements');

                // Check for content
                if (slider.children.length === 0)
                    throw new Error('You have to content inside the <pageslide>');

                content = angular.element(slider.children);

                /* Append */
                body.appendChild(slider);

                /* Style setup */
                slider.style.zIndex = param.zindex;
                slider.style.position = param.container !== false ? 'absolute' : 'fixed';
                slider.style.width = 0;
                slider.style.height = 0;
                slider.style.transitionDuration = param.speed + 's';
                slider.style.webkitTransitionDuration = param.speed + 's';
                slider.style.transitionProperty = 'width, height';

                if (param.squeeze) {
                    body.style.position = 'absolute';
                    body.style.transitionDuration = param.speed + 's';
                    body.style.webkitTransitionDuration = param.speed + 's';
                    body.style.transitionProperty = 'top, bottom, left, right';
                }

                switch (param.side) {
                    case 'right':
                        slider.style.height = param.height || '100%';
                        slider.style.top = param.top || '0px';
                        slider.style.bottom = param.bottom || '0px';
                        slider.style.right = param.right || '0px';
                        break;
                    case 'left':
                        slider.style.height = param.height || '100%';
                        slider.style.top = param.top || '0px';
                        slider.style.bottom = param.bottom || '0px';
                        slider.style.left = param.left || '0px';
                        break;
                    case 'top':
                        slider.style.width = param.width || '100%';
                        slider.style.left = param.left || '0px';
                        slider.style.top = param.top || '0px';
                        slider.style.right = param.right || '0px';
                        break;
                    case 'bottom':
                        slider.style.width = param.width || '100%';
                        slider.style.bottom = param.bottom || '0px';
                        slider.style.left = param.left || '0px';
                        slider.style.right = param.right || '0px';
                        break;
                }


                /* Closed */
                function psClose(slider, param) {
                    if (slider && slider.style.width !== 0) {
                        content.css('display', 'none');
                        switch (param.side) {
                            case 'right':
                                slider.style.width = '0px';
                                if (param.squeeze) body.style.right = '0px';
                                if (param.push) {
                                    body.style.right = '0px';
                                    body.style.left = '0px';
                                }
                                break;
                            case 'left':
                                slider.style.width = '0px';
                                if (param.squeeze) body.style.left = '0px';
                                if (param.push) {
                                    body.style.left = '0px';
                                    body.style.right = '0px';
                                }
                                break;
                            case 'top':
                                slider.style.height = '0px';
                                if (param.squeeze) body.style.top = '0px';
                                if (param.push) {
                                    body.style.top = '0px';
                                    body.style.bottom = '0px';
                                }
                                break;
                            case 'bottom':
                                slider.style.height = '0px';
                                if (param.squeeze) body.style.bottom = '0px';
                                if (param.push) {
                                    body.style.bottom = '0px';
                                    body.style.top = '0px';
                                }
                                break;
                        }
                    }
                    $scope.psOpen = false;

                    if (param.keyListener) {
                        $document.off('keydown', keyListener);
                    }

                    setBodyClass('closed');
                }

                /* Open */
                function psOpen(slider, param) {
                    if (slider.style.width !== 0) {
                        switch (param.side) {
                            case 'right':
                                slider.style.width = param.size;
                                if (param.squeeze) body.style.right = param.size;
                                if (param.push) {
                                    body.style.right = param.size;
                                    body.style.left = '-' + param.size;
                                }
                                break;
                            case 'left':
                                slider.style.width = param.size;
                                if (param.squeeze) body.style.left = param.size;
                                if (param.push) {
                                    body.style.left = param.size;
                                    body.style.right = '-' + param.size;
                                }
                                break;
                            case 'top':
                                slider.style.height = param.size;
                                if (param.squeeze) body.style.top = param.size;
                                if (param.push) {
                                    body.style.top = param.size;
                                    body.style.bottom = '-' + param.size;
                                }
                                break;
                            case 'bottom':
                                slider.style.height = param.size;
                                if (param.squeeze) body.style.bottom = param.size;
                                if (param.push) {
                                    body.style.bottom = param.size;
                                    body.style.top = '-' + param.size;
                                }
                                break;
                        }

                        $timeout(function() {
                            content.css('display', 'block');
                        }, (param.speed * 1000));

                        $scope.psOpen = true;

                        if (param.keyListener) {
                            $document.on('keydown', keyListener);
                        }

                        setBodyClass('open');
                    }
                }

                function isFunction(functionToCheck) {
                    var getType = {};
                    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
                }

                /*
                * Close the sidebar if the 'esc' key is pressed
                * */

                function keyListener(e) {
                    var ESC_KEY = 27;
                    var key = e.keyCode || e.which;

                    if (key === ESC_KEY) {
                        psClose(slider, param);
                    }
                }

                /*
                * Watchers
                * */

                $scope.$watch('psOpen', function(value) {
                    if (!!value) {
                        psOpen(slider, param);
                    } else {
                        psClose(slider, param);
                    }
                });

                $scope.$watch('psSize', function(newValue, oldValue) {
                    if (oldValue !== newValue) {
                        param.size = newValue;
                        psOpen(slider, param);
                    }
                });

                /*
                * Events
                * */

                $scope.$on('$destroy', function () {
                    if (slider.parentNode === body) {
                        body.removeChild(slider);
                    }
                });

                if ($scope.psAutoClose) {
                    $scope.$on('$locationChangeStart', function() {
                        psClose(slider, param);
                    });
                    $scope.$on('$stateChangeStart', function() {
                        psClose(slider, param);
                    });

                }
            }
        };
    }
]);
