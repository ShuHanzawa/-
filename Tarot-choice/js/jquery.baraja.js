/**
 * jquery.baraja.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
 ;( function( $, window, undefined ) {
	
	'use strict';


	$.Baraja = function( options, element ) {
		
		this.$el = $( element );
		this._init( options );
		
	};

	$.Baraja.prototype = {

		_init : function( options ) {
			
			// options
			this.options = $.extend( true, {}, options );

			var transEndEventNames = {
				'WebkitTransition' : 'webkitTransitionEnd',
				'MozTransition' : 'transitionend',
				'OTransition' : 'oTransitionEnd',
				'msTransition' : 'MSTransitionEnd',
				'transition' : 'transitionend'
			};
			this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ];

			//this._setDefaultFanSettings();

			this.$items = this.$el.children( 'li' );
			this.itemsCount = this.$items.length;
			if( this.itemsCount === 0 ) {
				return false;
			}
			// support for CSS Transitions
			this.supportTransitions = Modernizr.csstransitions;
			// opened/closed deck
			this.closed = true;
			// アイテムに与えられた z-index の最小値
			this.itemZIndexMin = 1000;
			// アイテムの z-index 値を設定します
			this._setStack();
		},

		_setStack : function( $items ) {

			var self = this;
			$items = $items || this.$items;

			$items.each( function( i ) {

				$( this ).css( 'z-index', self.itemZIndexMin + self.itemsCount - 1 - i );

			} );

		},
		_setOrigin : function( $el, x, y ) {

			$el.css( 'transform-origin' , x + '% ' + y + '%' );

		},
		_setTransition : function( $el, prop, speed, easing, delay ) {

			if( !this.supportTransitions ) {
				return false;
			}
			if( !prop ) {
				prop = 'all';
			}
			if( !speed ) {
				speed = this.options.speed;
			}
			if( !easing ) {
				easing = this.options.easing;
			}
			if( !delay ) {
				delay = 0;
			}

			var styleCSS = '';
			
			prop === 'transform' ?
				styleCSS = {
					'-webkit-transition' : '-webkit-transform ' + speed + 'ms ' + easing + ' ' + delay + 'ms',
					'-moz-transition' : '-moz-transform ' + speed + 'ms ' + easing + ' ' + delay + 'ms',
					'-ms-transition' : '-ms-transform ' + speed + 'ms ' + easing + ' ' + delay + 'ms',
					'-o-transition' : '-o-transform ' + speed + 'ms ' + easing + ' ' + delay + 'ms',
					'transition' : 'transform ' + speed + 'ms ' + easing + ' ' + delay + 'ms'
				} :
				styleCSS = {
					'-webkit-transition' : prop + ' ' + speed + 'ms ' + easing + ' ' + delay + 'ms',
					'-moz-transition' : prop + ' ' + speed + 'ms ' + easing + ' ' + delay + 'ms',
					'-ms-transition' : prop + ' ' + speed + 'ms ' + easing + ' ' + delay + 'ms',
					'-o-transition' : prop + ' ' + speed + 'ms ' + easing + ' ' + delay + 'ms',
					'transition' : prop + ' ' + speed + 'ms ' + easing + ' ' + delay + 'ms'
				}

			$el.css( styleCSS );

		},
		_applyTransition : function( $el, styleCSS, fncomplete, force ) {

			if( this.supportTransitions ) {

				if( fncomplete ) {

					$el.on( this.transEndEventName, fncomplete );

					if( force ) {
						fncomplete.call();
					}

				}

				setTimeout( function() { $el.css( styleCSS ); }, 25 );

			}
			else {

				$el.css( styleCSS );

				if( fncomplete ) {

					fncomplete.call();
					
				}

			}

		},
		
		_fan : function( settings ) {

			var self = this;

			this.closed = false;
			
			// set transform origins
			// if minX and maxX are passed:
			if( settings.origin.minX && settings.origin.maxX ) {

				var max = settings.origin.maxX, min = settings.origin.minX,
					stepOrigin = ( max - min ) / this.itemsCount;

				this.$items.each( function( i ) {

					var $el = $( this ),
						pos = self.itemsCount - 1 - ( Number( $el.css( 'z-index' ) ) - self.itemZIndexMin ),
						originX = pos * ( max - min + stepOrigin ) / self.itemsCount + min;

					if( settings.direction === 'left' ) {
								
						originX = max + min - originX;

					}

					self._setOrigin( $( this ), originX, settings.origin.y );

				} );
			
			}
			else {

				this._setOrigin( this.$items, settings.origin.x , settings.origin.y );

			}

			this._setTransition( this.$items, 'transform', settings.speed, settings.easing );

			var stepAngle = settings.range / ( this.itemsCount - 1 ),
				stepTranslation = settings.translation / ( this.itemsCount - 1 ),
				cnt = 0;
			
			this.$items.each( function( i ) {

				var $el = $( this ),
					pos = self.itemsCount - 1 - ( Number( $el.css( 'z-index' ) ) - self.itemZIndexMin ),
					val = settings.center ? settings.range / 2 : settings.range,
					angle = val - stepAngle * pos,
					position = stepTranslation * ( self.itemsCount - pos - 1 );

				if( settings.direction === 'left' ) {
					
					angle *= -1;
					position *= -1;

				}

				if( settings.scatter ) {
					
					var extraAngle = Math.floor( Math.random() * stepAngle ),
						extraPosition = Math.floor( Math.random() * stepTranslation ) ;
					
					// not for the first item..
					if( pos !== self.itemsCount - 1 ) {

						angle = settings.direction === 'left' ? angle + extraAngle : angle - extraAngle;
						position = settings.direction === 'left' ? position - extraPosition : position + extraPosition;

					}

				}

				// save..
				$el.data( { translation : position, rotation : angle } );

				self._applyTransition( $el, { transform : 'translate(' + position + 'px) rotate(' + angle + 'deg)' }, function() {

					++cnt;
					$el.off( self.transEndEventName );
					
					if( cnt === self.itemsCount - 1 ) {
						self.isAnimating = false;
					}

				} );

			} );

		},
		_prepare : function( callback ) {

			var self = this;
			
			if( !this.closed ) {

				this._close( function() {

					callback.call();

				} );

			}
			else {

				callback.call();

			}

		},

		_dispatch : function( action, args ) {

			var self = this;

			action === this._fan

			this.isAnimating = true;
			
			this._prepare( function() {

				action.call( self, args );

			} );

		},

		// public メソッド: デッキを開きます
		fan : function( settings ) {

			this._dispatch( this._fan, settings );

		},

	};

	var logError = function( message ) {

		if ( window.console ) {

			window.console.error( message );
		
		}

	};
	
	$.fn.baraja = function( options ) {

		var instance = $.data( this, 'baraja' );
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				if ( !instance ) {

					logError( "cannot call methods on baraja prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for baraja instance" );
					return;
				
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		 
		else {
		
			this.each(function() {
				
				if ( instance ) {

					instance._init();
				
				}
				else {

					instance = $.data( this, 'baraja', new $.Baraja( options, this ) );
				
				}

			});
		
		}
		
		
		return instance;
		
	};
	
} )( jQuery, window );
