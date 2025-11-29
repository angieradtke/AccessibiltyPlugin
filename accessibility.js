!function (e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports["./dist"] = t() : e["./dist"] = t()
}(window, (function () {
	return function (e) {
		var t = {};

		function i(s) {
			if (t[s]) return t[s].exports;
			var n = t[s] = {i: s, l: !1, exports: {}};
			return e[s].call(n.exports, n, n.exports, i), n.l = !0, n.exports
		}

		return i.m = e, i.c = t, i.d = function (e, t, s) {
			i.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: s})
		}, i.r = function (e) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
		}, i.t = function (e, t) {
			if (1 & t && (e = i(e)), 8 & t) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var s = Object.create(null);
			if (i.r(s), Object.defineProperty(s, "default", {
				enumerable: !0,
				value: e
			}), 2 & t && "string" != typeof e) for (var n in e) i.d(s, n, function (t) {
				return e[t]
			}.bind(null, n));
			return s
		}, i.n = function (e) {
			var t = e && e.__esModule ? function () {
				return e.default
			} : function () {
				return e
			};
			return i.d(t, "a", t), t
		}, i.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}, i.p = "", i(i.s = 0)
	}([function (e, t, i) {
		"use strict";
		i.r(t);
		let s = document.body || document.getElementsByTagName("body")[0], n = new Map, o = {
			isIOS: () => {
				if ("boolean" == typeof o._isIOS) return o._isIOS;
				return o._isIOS = (() => {
					var e = ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"];
					if (navigator.platform) for (; e.length;) if (navigator.platform === e.pop()) return !0;
					return !1
				})(), o._isIOS
			},
			jsonToHtml: (e, t) => {
				let i = document.createElement(e.type);
				for (let s in e.attrs) 0 === s.indexOf("#") && t ? i.setAttribute(e.attrs[s], t[s.substring(1)]) : i.setAttribute(s, e.attrs[s]);
				for (let s in e.children) {
					let n = null;
					n = "#text" == e.children[s].type ? 0 == e.children[s].text.indexOf("#") ? document.createTextNode(t[e.children[s].text.substring(1)]) : document.createTextNode(e.children[s].text) : o.jsonToHtml(e.children[s], t), (n && n.tagName && "undefined" !== n.tagName.toLowerCase() || 3 == n.nodeType) && i.appendChild(n)
				}
				return i
			},
			injectStyle: (e, t = {}) => {
				let i = document.createElement("style");
				return i.appendChild(document.createTextNode(e)), t.className && i.classList.add(t.className), s.appendChild(i), i
			},
			getFormattedDim: e => {
				if (!e) return null;
				let t = function (e, t) {
					return {size: e.substring(0, e.indexOf(t)), sufix: t}
				};
				return (e = String(e)).indexOf("%") > -1 ? t(e, "%") : e.indexOf("px") > -1 ? t(e, "px") : e.indexOf("em") > -1 ? t(e, "em") : e.indexOf("rem") > -1 ? t(e, "rem") : e.indexOf("pt") > -1 ? t(e, "pt") : "auto" == e ? t(e, "") : void 0
			},
			extend: (e, t) => {
				for (let i in e) "object" == typeof e[i] ? t && t[i] && (e[i] = o.extend(e[i], t[i])) : "object" == typeof t && void 0 !== t[i] && (e[i] = t[i]);
				return e
			},
			injectIconsFont(e, t) {
				if (e && e.length) {
					let i = document.getElementsByTagName("head")[0], s = 0, n = () => {
						--s || t()
					};
					e.forEach(e => {
						let t = document.createElement("link");
						t.type = "text/css", t.rel = "stylesheet", t.href = e, t.className = "_access-font-icon-" + s++, t.onload = n, o.deployedObjects.set("." + t.className, !0), i.appendChild(t)
					})
				}
			},
			getFixedFont: e => o.isIOS() ? e.replaceAll(" ", "+") : e,
			getFixedPseudoFont: e => o.isIOS() ? e.replaceAll("+", " ") : e,
			isFontLoaded(e, t) {
				try {
					const i = () => t(document.fonts.check("1em " + e.replaceAll("+", " ")));
					document.fonts.ready.then(() => {
						i()
					}, () => {
						i()
					})
				} catch (e) {
					return t(!0)
				}
			},
			warn(e) {
				console.warn ? console.warn("Accessibility: " + e) : console.log("Accessibility: " + e)
			},
			deployedObjects: {
				get: e => n.get(e), contains: e => n.has(e), set: (e, t) => {
					n.set(e, t)
				}, remove: e => {
					n.delete(e)
				}, getAll: () => n
			}
		};
		var a = o;
		var c = {
			has: e => window.localStorage.hasOwnProperty(e), set(e, t) {
				window.localStorage.setItem(e, JSON.stringify(t))
			}, get(e) {
				let t = window.localStorage.getItem(e);
				try {
					return JSON.parse(t)
				} catch (e) {
					return t
				}
			}, clear() {
				window.localStorage.clear()
			}, remove(e) {
				window.localStorage.removeItem(e)
			}, isSupported() {
				try {
					return localStorage.setItem("_test", "_test"), localStorage.removeItem("_test"), !0
				} catch (e) {
					return !1
				}
			}
		};
		let r = {
			icon: {
				position: {bottom: {size: 64, units: "px"}, right: {size: 10, units: "px"}, type: "fixed"},
				dimensions: {width: {size: 64, units: "px"}, height: {size: 64, units: "px"}},
				zIndex: "9999",
				backgroundColor: "#4054b2",
				color: "#fff",
				img: "accessible",
				circular: !1,
				circularBorder: !1,
				fontFaceSrc: ["https://fonts.googleapis.com/icon?family=Material+Icons"],
				fontFamily: a.getFixedFont("Material Icons"),
				fontClass: "material-icons",
				useEmojis: !1
			},
			hotkeys: {
				enabled: !1,
				helpTitles: !0,
				keys: {
					toggleMenu: ["ctrlKey", "altKey", 65],
					invertColors: ["ctrlKey", "altKey", 73],
					grayHues: ["ctrlKey", "altKey", 71],
					underlineLinks: ["ctrlKey", "altKey", 85],
					bigCursor: ["ctrlKey", "altKey", 67],
					readingGuide: ["ctrlKey", "altKey", 82],
					textToSpeech: ["ctrlKey", "altKey", 84],
					speechToText: ["ctrlKey", "altKey", 83]
				}
			},
			buttons: {font: {size: 18, units: "px"}},
			guide: {cBorder: "#20ff69", cBackground: "#000000", height: "12px"},
			menu: {
				dimensions: {width: {size: 25, units: "vw"}, height: {size: "auto", units: ""}},
				fontFamily: "RobotoDraft, Roboto, sans-serif, Arial"
			},
			labels: {
				resetTitle: "Reset",
				closeTitle: "Close",
				menuTitle: "Accessibility Options",
				increaseText: "increase text size",
				decreaseText: "decrease text size",
				increaseTextSpacing: "increase text spacing",
				decreaseTextSpacing: "decrease text spacing",
				invertColors: "invert colors",
				grayHues: "gray hues",
				bigCursor: "big cursor",
				readingGuide: "reading guide",
				underlineLinks: "underline links",
				textToSpeech: "text to speech",
				speechToText: "speech to text",
		        reset:"Reset"
			},
			textToSpeechLang: "en-US",
			speechToTextLang: "en-US",
			textPixelMode: !1,
			textEmlMode: !0,
			animations: {buttons: !0},
			modules: {
				increaseText: !0,
				decreaseText: !0,
				increaseTextSpacing: !0,
				decreaseTextSpacing: !0,
				invertColors: !0,
				grayHues: !0,
				bigCursor: !0,
				readingGuide: !0,
				underlineLinks: !0,
				textToSpeech: !0,
				speechToText: !0
			},
			session: {persistent: !0}
		}, l = null;

		class u {
			constructor(e = {}) {
				l = this, e = this.deleteOppositesIfDefined(e), this.options = a.extend(r, e), this.disabledUnsupportedFeatures(), this.sessionState = {
					textSize: 0,
					textSpace: 0,
					invertColors: !1,
					grayHues: !1,
					underlineLinks: !1,
					bigCursor: !1,
					readingGuide: !1
				}, this.options.icon.useEmojis ? (this.fontFallback(), this.build()) : a.injectIconsFont(this.options.icon.fontFaceSrc, () => {
					this.build(), this.options.icon.forceFont || setTimeout(() => {
						a.isFontLoaded(this.options.icon.fontFamily, e => {
							e || (a.warn(this.options.icon.fontFamily + " font was not loaded, using emojis instead"), this.fontFallback(), this.destroy(), this.build())
						})
					})
				}), this.options.modules.speechToText && window.addEventListener("beforeunload", () => {
					this.isReading && (window.speechSynthesis.cancel(), this.isReading = !1)
				})
			}

			initFontSize() {
				if (!this.htmlInitFS) {
					let e = a.getFormattedDim(getComputedStyle(this.html).fontSize),
						t = a.getFormattedDim(getComputedStyle(this.body).fontSize);
					this.html.style.fontSize = e.size / 16 * 100 + "%", this.htmlOrgFontSize = this.html.style.fontSize, this.body.style.fontSize = t.size / e.size + "em"
				}
			}

			fontFallback() {
				this.options.icon.useEmojis = !0, this.options.icon.fontFamily = null, this.options.icon.img = "♿", this.options.icon.fontClass = ""
			}

			deleteOppositesIfDefined(e) {
				return e.icon && e.icon.position && (e.icon.position.left && (delete r.icon.position.right, r.icon.position.left = e.icon.position.left), e.icon.position.top && (delete r.icon.position.bottom, r.icon.position.top = e.icon.position.top)), e
			}

			disabledUnsupportedFeatures() {
				"webkitSpeechRecognition" in window && "https:" == location.protocol || (a.warn("speech to text isn't supported in this browser or in http protocol (https required)"), this.options.modules.speechToText = !1), window.SpeechSynthesisUtterance && window.speechSynthesis || (a.warn("text to speech isn't supported in this browser"), this.options.modules.textToSpeech = !1), navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && (a.warn("grayHues isn't supported in firefox"), this.options.modules.grayHues = !1)
			}

			injectCss() {
				// Load static CSS file
				this.loadStaticCSS();

				// Generate dynamic CSS based on options
				const dynamicCSS = this.generateDynamicCSS();
				a.injectStyle(dynamicCSS, {className: "_access-dynamic-css"});
				a.deployedObjects.set("._access-dynamic-css", false);
			}

			loadStaticCSS() {
				const cssUrl = 'media/vendor/accessibility/css/accessibility-base.css';
				if (!document.querySelector(`link[href="${cssUrl}"]`)) {
					const link = document.createElement('link');
					link.rel = 'stylesheet';
					link.href = cssUrl;
					link.className = '_access-base-css';
					document.head.appendChild(link);
					a.deployedObjects.set("._access-base-css", false);
				}
			}

			generateDynamicCSS() {
				return `
					._access-icon {
						position: ${this.options.icon.position.type};
						background-repeat: no-repeat;
						background-size: contain;
						cursor: pointer;
						opacity: 0;
						border:0;
						transition-duration: .5s;
						text-align:center;
						${this.options.icon.usseEmojis ? "" : ""}
				
					}
					._access-icon svg path {fill: var(--accessibility-icon-color)}
					._access-icon:hover {
						${this.options.animations.buttons && !this.options.icon.useEmojis ? `
							box-shadow: 1px 1px 10px rgba(0,0,0,.9);
							transform: scale(1.1);
						` : ""}
						
					}
						._access-icon:hover svg path {fill: var(--accessibility-icon-color-hover)}

					${this.options.animations.buttons && this.options.icon.circularBorder ? `
					.circular._access-icon:hover {
						border: 5px solid white;
						border-style: double;
						font-size: 35px!important;
						vertical-align: middle;
						padding-top: 2px;
						text-align: center;
					}
					` : ""}

					.access_read_guide_bar {
						box-sizing: border-box;
						background: ${this.options.guide.cBackground};
						width: 100%!important;
						min-width: 100%!important;
						position: fixed!important;
						height: ${this.options.guide.height} !important;
						border: solid 3px ${this.options.guide.cBorder};
						border-radius: 5px;
						top: 15px;
						z-index: 2147483647;
					}

					._access-menu {
						-moz-user-select: none;
						-webkit-user-select: none;
						-ms-user-select: none;
						user-select: none;
						position: fixed;
						width: ${this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units};
						height: ${this.options.menu.dimensions.height.size + this.options.menu.dimensions.height.units};
						transition-duration: .5s;
						z-index: ${this.options.icon.zIndex + 1};
						opacity: 1;
						background-color: #fff;
						color: #000;
						border-radius: 3px;
						border: solid 1px #f1f0f1;
						font-family: ${this.options.menu.fontFamily};
						min-width: 300px;
						box-shadow: 0px 0px 1px #aaa;
						max-height: 100vh;
						${"rtl" == getComputedStyle(this.body).direction ? "text-indent: -5px" : ""}
					}

					._access-menu.close.left {
						left: -${this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units};
					}

					._access-menu.close.right {
						right: -${this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units};
					}

					${this.options.animations.buttons ? `
					._access-menu ._menu-reset-btn:hover,
					._access-menu ._menu-close-btn:hover {
						transform: rotate(180deg);
					}
					` : ""}

					._access-menu ul li {
						list-style-type: none;
						cursor: pointer;
						-ms-user-select: none;
						-moz-user-select: none;
						-webkit-user-select: none;
						user-select: none;
						margin: 5px;
						transition-duration: .5s;
						transition-timing-function: ease-in-out;
						font-size: ${this.options.buttons.font.size + this.options.buttons.font.units} !important;
						line-height: ${this.options.buttons.font.size + this.options.buttons.font.units} !important;
			
				
						color: rgba(0,0,0,.6);
						letter-spacing: initial!important;
						word-spacing: initial!important;
					}

					._access-menu ul li:before {
						${this.options.icon.useEmojis ? "" : "font-family: " + a.getFixedPseudoFont(this.options.icon.fontFamily) + ";"}
						line-height: ${this.options.icon.useEmojis ? "1.1" : "1"};
						font-size: ${this.options.icon.useEmojis ? "20px" : "24px"} !important;
					}

					/* Additional dynamic styles for menu dimensions and button fonts */
					._access-menu {
						width: ${this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units};
						height: ${this.options.menu.dimensions.height.size + this.options.menu.dimensions.height.units};
					}

					._access-menu ul li {
						font-size: ${this.options.buttons.font.size + this.options.buttons.font.units} !important;
						line-height: ${this.options.buttons.font.size + this.options.buttons.font.units} !important;
					}

					._access-menu-button {
						width: 100%;
						border: none;
						background: transparent;
						text-align: left;
						padding: 0;
						margin: 0;
						font-family: inherit;
						font-size: inherit;
						line-height: inherit;
						color: inherit;
						cursor: pointer;
						display: flex;
						align-items: center;
						position: relative;
						
					}

					._access-menu-button:focus {
						outline: 2px solid #4054b2;
						outline-offset: 2px;
					}

					._access-menu-button:hover {
						background: transparent;
					}

					._access-menu-button.not-supported {
						display: none;
					}

					._access-text-size-range {
						width: 100%;
						margin: 10px 0;
						background: linear-gradient(to right, 
							#ff6b6b 0%, 
							#ff6b6b 41.66%, 
							#4ecdc4 41.66%, 
							#4ecdc4 58.33%, 
							#45b7d1 58.33%, 
							#45b7d1 100%);
						height: 8px;
						border-radius: 4px;
						outline: none;
						-webkit-appearance: none;
						position: relative;
					}

					._access-text-size-range::-webkit-slider-thumb {
						-webkit-appearance: none;
						appearance: none;
						width: 20px;
						height: 20px;
						border-radius: 50%;
						background: #333;
						cursor: pointer;
						border: 2px solid #fff;
						box-shadow: 0 2px 4px rgba(0,0,0,0.3);
					}

					._access-text-size-range::-moz-range-thumb {
						width: 20px;
						height: 20px;
						border-radius: 50%;
						background: #333;
						cursor: pointer;
						border: 2px solid #fff;
						box-shadow: 0 2px 4px rgba(0,0,0,0.3);
					}

					._access-text-size-range::before {
						content: '';
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 3px;
						height: 12px;
						background: #333;
						border-radius: 1px;
						pointer-events: none;
						z-index: 1;
					}

					._access-range-label {
						display: block;
						margin-bottom: 5px;
						font-weight: bold;
						color: rgba(0,0,0,.8);
					}

					._access-menu-range {
						width: 100%;
						height: 6px;
						border-radius: 3px;
						background: #ddd;
						outline: none;
						opacity: 0.7;
						transition: opacity 0.2s;
						margin: 10px 0;
						cursor: pointer;
					}

					._access-menu-range:hover {
						opacity: 1;
					}

					._access-menu-range::-webkit-slider-thumb {
						appearance: none;
						width: 20px;
						height: 20px;
						border-radius: 50%;
						background: #4054b2;
						cursor: pointer;
						border: 2px solid #fff;
						box-shadow: 0 2px 4px rgba(0,0,0,0.2);
					}

					._access-menu-range::-moz-range-thumb {
						width: 20px;
						height: 20px;
						border-radius: 50%;
						background: #4054b2;
						cursor: pointer;
						border: 2px solid #fff;
						box-shadow: 0 2px 4px rgba(0,0,0,0.2);
					}

					._access-menu-range::-webkit-slider-track {
						width: 100%;
						height: 6px;
						cursor: pointer;
						background: #ddd;
						border-radius: 3px;
					}

					._access-menu-range::-moz-range-track {
						width: 100%;
						height: 6px;
						cursor: pointer;
						background: #ddd;
						border-radius: 3px;
						border: none;
					}

					._access-menu-range:focus {
						outline: 2px solid #4054b2;
						outline-offset: 2px;
					}

					._access-menu-range.not-supported {
						display: none;
					}
				`;
			}

			injectIcon() {
				let e = .8 * this.options.icon.dimensions.width.size, t = .9 * this.options.icon.dimensions.width.size,
					i = .1 * this.options.icon.dimensions.width.size,
					s = `width: ${this.options.icon.dimensions.width.size + this.options.icon.dimensions.width.units}\n            ;height: ${this.options.icon.dimensions.height.size + this.options.icon.dimensions.height.units}\n            ;text-indent: ${i + this.options.icon.dimensions.width.units}\n            ;background-color: ${this.options.icon.useEmojis ? "transparent" : this.options.icon.backgroundColor};color: ${this.options.icon.color}`;
				for (let e in this.options.icon.position) s += ";" + e + ":" + this.options.icon.position[e].size + this.options.icon.position[e].units;
				s += ";z-index: " + this.options.icon.zIndex;
				let n = `_access-icon ${this.options.icon.fontClass} _access` + (this.options.icon.circular ? " circular" : ""),
 				o = a.jsonToHtml({
 					type: "button",
 					attrs: {
 						class: n,
 						style: s,
 						title: this.options.labels.menuTitle,
 						"aria-label": this.options.labels.menuTitle,
 						"tabindex": "0",
 						"aria-expanded": "false",
 						"aria-haspopup": "menu"
 					},
 					children: [{type: "div", attrs: {id: "iconAccessMain"}}]
 				});
				return this.body.appendChild(o), a.deployedObjects.set("._access-icon", !1), o
			}

			parseKeys(e) {
				return this.options.hotkeys.enabled && this.options.hotkeys.helpTitles ? "Hotkey: " + e.map((function (e) {
					return Number.isInteger(e) ? String.fromCharCode(e).toLowerCase() : e.replace("Key", "")
				})).join("+") : ""
			}

			injectMenu() {
				let e = a.jsonToHtml({
					type: "div",
					attrs: {
						class: "_access-menu close _access",
						"role": "dialog",
						"aria-labelledby": "_access-menu-title",
						"aria-hidden": "true"
					},
					children: [{
						type: "h3",
						attrs: {
							class: "_text-center",
							id: "_access-menu-title"
						},
						children: [{
							type: "button",
							attrs: {
								class: "_menu-close-btn _menu-btn " + this.options.icon.fontClass,
								title: this.options.labels.closeTitle,
								"aria-label": this.options.labels.closeTitle,
								"tabindex": "0"
							},
							children: [{type: "div", attrs: {id: "iconMenuClose"}}, {type: "span", attrs: {class: "screenreader-only"}, children: [{type: "#text", text: "" + ( "close")}]}]
						}, {type: "#text", text: this.options.labels.menuTitle}, {
							type: "button",
							attrs: {
								class: "_menu-reset-btn _menu-btn " + this.options.icon.fontClass,
								title: this.options.labels.resetTitle,
								"aria-label": this.options.labels.resetTitle,
								"tabindex": "0"
							},
							children: [{type: "div", attrs: {id: "iconMenuReset"}}, {type: "span", attrs: {class: "screenreader-only"}, children: [{type: "#text", text: "" + ( "refresh")}]}]
						}]
					}, {
						type: "ul",
						attrs: {
							class: this.options.animations.buttons ? "before-collapse _access-scrollbar" : "_access-scrollbar",
							"role": "menu",
							"aria-labelledby": "_access-menu-title"
						},
						children: [{
							type: "li",
							attrs: {

							},
							children: [{
								type: "label",
								attrs: {
									"for": "textSizeRange",
									"class": "_access-range-label"
								},
								children: [{
									type: "div",
									attrs: {
										"style": "display: flex; align-items: center; gap: 10px;"
									},
									children: [
										{type: "div", attrs: {id: "iconDecreaseText"}},
										{type: "#text", text: this.options.labels.decreaseText + " / " + this.options.labels.increaseText},
										{type: "div", attrs: {id: "iconIncreaseText"}}
									]
								}]
							}, {
								type: "input",
								attrs: {
									"type": "range",
									"min": "-10",
									"max": "10",
									"id": "textSizeRange",
									"data-access-action": "textSize",
									"role": "slider",
									"aria-label": "Text size adjustment: -200% to +200%",
									"tabindex": "0",
									"class": "_access-menu-range _access-text-size-range",
									"value": "0"
								}
							}]
						}, {
							type: "li",
							attrs: {

							},
							children: [{
								type: "label",
								attrs: {
									"for": "textSpacingRange",
									"class": "_access-range-label"
								},
								children: [{
									type: "div",
									attrs: {
										"style": "display: flex; align-items: center; gap: 10px;"
									},
									children: [
										{type: "div", attrs: {id: "iconDecreaseTextSpacing"}},
										{type: "#text", text: this.options.labels.decreaseTextSpacing + " / " + this.options.labels.increaseTextSpacing},
										{type: "div", attrs: {id: "iconIncreaseTextSpacing"}}
									]
								}]
							}, {
								type: "input",
								attrs: {
									"type": "range",
									"min": "-6",
									"max": "6",
									"id": "textSpacingRange",
									"data-access-action": "textSpacing",
									"role": "slider",
									"aria-label": "Text spacing adjustment: -600% to +600%",
									"tabindex": "0",
									"class": "_access-menu-range _access-text-spacing-range",
									"value": "0"
								}
							}]
						}, {
							type: "li",
							attrs: {
								"role": "none"
							},
							children: [{
								type: "button",
								attrs: {
									"data-access-action": "invertColors",
									"role": "menuitem",
									"aria-label": this.options.labels.invertColors + (this.parseKeys(this.options.hotkeys.keys.invertColors) ? " - " + this.parseKeys(this.options.hotkeys.keys.invertColors) : ""),
									"tabindex": "0",
									"class": "_access-menu-button",
									title: this.parseKeys(this.options.hotkeys.keys.invertColors)
								},
								children: [{type: "div", attrs: {id: "iconInvertColors"}}, {
									type: "#text",
									text: this.options.labels.invertColors
								}]
							}]
						}, {
							type: "li",
							attrs: {
								"role": "none"
							},
							children: [{
								type: "button",
								attrs: {
									"data-access-action": "grayHues",
									"role": "menuitem",
									"aria-label": this.options.labels.grayHues + (this.parseKeys(this.options.hotkeys.keys.grayHues) ? " - " + this.parseKeys(this.options.hotkeys.keys.grayHues) : ""),
									"tabindex": "0",
									"class": "_access-menu-button",
									title: this.parseKeys(this.options.hotkeys.keys.grayHues)
								},
								children: [{type: "#text", text: this.options.labels.grayHues}]
							}]
						}, {
							type: "li",
							attrs: {
								"role": "none"
							},
							children: [{
								type: "button",
								attrs: {
									"data-access-action": "underlineLinks",
									"role": "menuitem",
									"aria-label": this.options.labels.underlineLinks + (this.parseKeys(this.options.hotkeys.keys.underlineLinks) ? " - " + this.parseKeys(this.options.hotkeys.keys.underlineLinks) : ""),
									"tabindex": "0",
									"class": "_access-menu-button",
									title: this.parseKeys(this.options.hotkeys.keys.underlineLinks)
								},
								children: [{type: "div", attrs: {id: "iconUnderlineLinks"}}, {
									type: "#text",
									text: this.options.labels.underlineLinks
								}]
							}]
						}, {
							type: "li",
							attrs: {
								"role": "none"
							},
							children: [{
								type: "button",
								attrs: {
									"data-access-action": "bigCursor",
									"role": "menuitem",
									"aria-label": this.options.labels.bigCursor + (this.parseKeys(this.options.hotkeys.keys.bigCursor) ? " - " + this.parseKeys(this.options.hotkeys.keys.bigCursor) : ""),
									"tabindex": "0",
									"class": "_access-menu-button",
									title: this.parseKeys(this.options.hotkeys.keys.bigCursor)
								},
								children: [{type: "div", attrs: {id: "iconBigCursor"}}, {
									type: "#text",
									text: this.options.labels.bigCursor
								}]
							}]
						}, {
							type: "li",
							attrs: {
								"role": "none"
							},
							children: [{
								type: "button",
								attrs: {
									"data-access-action": "readingGuide",
									"role": "menuitem",
									"aria-label": this.options.labels.readingGuide + (this.parseKeys(this.options.hotkeys.keys.readingGuide) ? " - " + this.parseKeys(this.options.hotkeys.keys.readingGuide) : ""),
									"tabindex": "0",
									"class": "_access-menu-button",
									title: this.parseKeys(this.options.hotkeys.keys.readingGuide)
								},
								children: [{type: "div", attrs: {id: "iconReadingGuide"}}, {type: "#text", text: this.options.labels.readingGuide}]
							}]
						}, {
							type: "li",
							attrs: {
								"role": "none"
							},
							children: [{
								type: "button",
								attrs: {
									"data-access-action": "textToSpeech",
									"role": "menuitem",
									"aria-label": this.options.labels.textToSpeech,
									"tabindex": "0",
									"class": "_access-menu-button"
								},
								children: [{type: "div", attrs: {id: "iconTextToSpeech"}}, {type: "#text", text: this.options.labels.textToSpeech}]
							}]
						}, {
							type: "li",
							attrs: {
								"role": "none"
							},
							children: [{
								type: "button",
								attrs: {
									"data-access-action": "speechToText",
									"role": "menuitem",
									"aria-label": this.options.labels.speechToText,
									"tabindex": "0",
									"class": "_access-menu-button"
								},
								children: [{type: "#text", text: this.options.labels.speechToText}]
							}]
						}]
					}]
				});
				for (let t in this.options.icon.position) e.classList.add(t);
				return this.body.appendChild(e), setTimeout((function () {
					let e = document.getElementById("iconBigCursor");
					e && (e.outerHTML = e.outerHTML + '<svg  id="iconBigCursorSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"  xml:space="preserve"><path d="M 423.547 323.115 l -320 -320 c -3.051 -3.051 -7.637 -3.947 -11.627 -2.304 s -6.592 5.547 -6.592 9.856 V 480 c 0 4.501 2.837 8.533 7.083 10.048 c 4.224 1.536 8.981 0.192 11.84 -3.285 l 85.205 -104.128 l 56.853 123.179 c 1.792 3.883 5.653 6.187 9.685 6.187 c 1.408 0 2.837 -0.277 4.203 -0.875 l 74.667 -32 c 2.645 -1.131 4.736 -3.285 5.76 -5.973 c 1.024 -2.688 0.939 -5.675 -0.277 -8.299 l -57.024 -123.52 h 132.672 c 4.309 0 8.213 -2.603 9.856 -6.592 C 427.515 330.752 426.598 326.187 423.547 323.115 Z"/></svg>', document.getElementById("iconBigCursor").remove());
					let increaseTextIcon = document.getElementById("iconIncreaseText");
					increaseTextIcon && (increaseTextIcon.outerHTML = increaseTextIcon.outerHTML + '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve" ><path d="M15.671,10.188v16.056h2.763c0.987,0,1.691,0.19,2.112,0.571c0.42,0.379,0.63,0.877,0.63,1.49 c0,0.602-0.21,1.092-0.63,1.473c-0.421,0.379-1.125,0.57-2.112,0.57H8.824c-0.988,0-1.691-0.191-2.112-0.57 c-0.42-0.381-0.63-0.878-0.63-1.492c0-0.601,0.21-1.092,0.63-1.471c0.421-0.381,1.124-0.571,2.112-0.571h2.742V10.188H7.123v3.884 c0,0.988-0.19,1.692-0.571,2.112c-0.38,0.421-0.877,0.631-1.491,0.631c-0.601,0-1.091-0.21-1.472-0.631 c-0.38-0.42-0.57-1.124-0.57-2.112V6.063l21.261,0.02v7.988c0,0.988-0.19,1.692-0.57,2.112c-0.381,0.421-0.878,0.631-1.492,0.631 c-0.6,0-1.091-0.21-1.471-0.631c-0.381-0.42-0.57-1.124-0.57-2.112v-3.884H15.671z"/><path   d="M29.601,24.063v4.02c0,0.578-0.109,0.99-0.328,1.236s-0.508,0.369-0.867,0.369 s-0.65-0.123-0.873-0.369s-0.334-0.658-0.334-1.236v-4.02h-3.434c-0.578,0-0.99-0.111-1.236-0.334s-0.369-0.514-0.369-0.873 s0.123-0.65,0.369-0.873s0.658-0.33,1.236-0.322h3.434v-4.007c0-0.57,0.111-0.98,0.334-1.23s0.514-0.375,0.873-0.375 s0.65,0.123,0.873,0.369s0.334,0.658,0.334,1.236l-0.012,4.007h3.434c0.578,0,0.99,0.109,1.236,0.328s0.369,0.508,0.369,0.867 s-0.123,0.65-0.369,0.873s-0.658,0.334-1.236,0.334H29.601z"/></svg>', document.getElementById("iconIncreaseText").remove());
					let decreaseTextIcon = document.getElementById("iconDecreaseText");
					decreaseTextIcon && (decreaseTextIcon.outerHTML = decreaseTextIcon.outerHTML + '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve" ><path d="M15.671,10.188v16.056h2.763c0.987,0,1.691,0.189,2.112,0.57c0.42,0.379,0.63,0.877,0.63,1.49 c0,0.602-0.21,1.092-0.63,1.473c-0.421,0.379-1.125,0.57-2.112,0.57h-9.61c-0.988,0-1.691-0.191-2.112-0.57 c-0.42-0.381-0.63-0.877-0.63-1.491c0-0.601,0.21-1.093,0.63-1.472c0.421-0.381,1.124-0.57,2.112-0.57h2.742V10.188H7.123v3.884 c0,0.988-0.19,1.692-0.571,2.112c-0.38,0.421-0.877,0.631-1.491,0.631c-0.601,0-1.091-0.21-1.472-0.631 c-0.38-0.42-0.57-1.124-0.57-2.112V6.063l21.26,0.02v7.988c0,0.988-0.189,1.692-0.569,2.112c-0.381,0.421-0.878,0.631-1.492,0.631 c-0.6,0-1.091-0.21-1.471-0.631c-0.381-0.42-0.569-1.124-0.569-2.112v-3.884L15.671,10.188L15.671,10.188z"/><line fill="none" x1="22.159" y1="22.855" x2="33.833" y2="22.855"/><path d="M22.666,23.376c3.057,0,6.111,0,9.167,0c2.418,0,2.418-3.75,0-3.75c-3.056,0-6.11,0-9.167,0 C20.248,19.626,20.248,23.376,22.666,23.376L22.666,23.376z"/></svg>', document.getElementById("iconDecreaseText").remove());
					let decreaseTextSpacingIcon = document.getElementById("iconDecreaseTextSpacing");
					decreaseTextSpacingIcon && (decreaseTextSpacingIcon.outerHTML = decreaseTextSpacingIcon.outerHTML + '<svg id="decreaseTextSpacing" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve" ><path  d="M4.616,11.884c2.875,2.875,5.75,5.75,8.625,8.625c1.141,1.141,2.909-0.627,1.768-1.768 c-2.875-2.875-5.75-5.75-8.625-8.625C5.243,8.975,3.475,10.743,4.616,11.884L4.616,11.884z"/><path  d="M13.241,18.741c-2.708,2.708-5.417,5.417-8.125,8.125c-1.141,1.141,0.627,2.908,1.768,1.768 c2.708-2.708,5.417-5.417,8.125-8.125C16.15,19.368,14.382,17.6,13.241,18.741L13.241,18.741z"/><path d="M33.009,26.866c-2.875-2.875-5.75-5.75-8.625-8.625c-1.141-1.141-2.908,0.627-1.768,1.768 c2.875,2.875,5.75,5.75,8.625,8.625C32.382,29.774,34.149,28.007,33.009,26.866L33.009,26.866z"/><path d="M24.384,20.009c2.708-2.708,5.417-5.417,8.125-8.125c1.141-1.141-0.627-2.909-1.768-1.768 c-2.708,2.708-5.417,5.417-8.125,8.125C21.476,19.382,23.243,21.149,24.384,20.009L24.384,20.009z"/></svg>', document.getElementById("iconDecreaseTextSpacing").remove());
					let increaseTextSpacingIcon = document.getElementById("iconIncreaseTextSpacing");
					increaseTextSpacingIcon && (increaseTextSpacingIcon.outerHTML = increaseTextSpacingIcon.outerHTML + '<svg  id="increaseTextSpacing" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve"><path d="M22.616,11.884c2.875,2.875,5.75,5.75,8.625,8.625c1.141,1.141,2.908-0.627,1.768-1.768 c-2.875-2.875-5.75-5.75-8.625-8.625C23.243,8.975,21.476,10.743,22.616,11.884L22.616,11.884z"  /><path  d="M31.241,18.741c-2.708,2.708-5.417,5.417-8.125,8.125c-1.141,1.141,0.627,2.908,1.768,1.768 c2.708-2.708,5.417-5.417,8.125-8.125C34.149,19.368,32.382,17.6,31.241,18.741L31.241,18.741z"/><path d="M13.009,26.866c-2.875-2.875-5.75-5.75-8.625-8.625c-1.141-1.141-2.909,0.627-1.768,1.768 c2.875,2.875,5.75,5.75,8.625,8.625C12.382,29.774,14.15,28.007,13.009,26.866L13.009,26.866z"/><path d="M4.384,20.009c2.708-2.708,5.417-5.417,8.125-8.125c1.141-1.141-0.627-2.909-1.768-1.768 c-2.708,2.708-5.417,5.417-8.125,8.125C1.475,19.382,3.243,21.149,4.384,20.009L4.384,20.009z"/></svg>', document.getElementById("iconIncreaseTextSpacing").remove());
					let invertColorsIcon = document.getElementById("iconInvertColors");
					invertColorsIcon && (invertColorsIcon.outerHTML = invertColorsIcon.outerHTML + '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve" ><circle fill="#ddd"  cx="17.574" cy="19.104" r="14.093"/><g><path fill="#FFFFFF" d="M17.699,7.303c6.517,0,11.801,5.283,11.801,11.8c0,6.518-5.284,11.801-11.801,11.801V7.303z"/></g></svg>', document.getElementById("iconInvertColors").remove());
					let underlineLinksIcon = document.getElementById("iconUnderlineLinks");
					underlineLinksIcon && (underlineLinksIcon.outerHTML = underlineLinksIcon.outerHTML + '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve" ><path d="M4.5,30.438c9.167,0,18.333,0,27.5,0c2.418,0,2.418-3.75,0-3.75c-9.166,0-18.333,0-27.5,0 C2.082,26.688,2.082,30.438,4.5,30.438L4.5,30.438z"/><path d="M25.55,7.44v9.362c0,2.041-0.734,3.776-2.201,5.205c-1.465,1.429-3.23,2.144-5.293,2.144c-1.02,0-1.979-0.181-2.875-0.541 c-0.898-0.359-1.703-0.889-2.418-1.586c-0.714-0.699-1.27-1.426-1.667-2.184s-0.596-1.77-0.596-3.038V7.44 c-0.698,0-1.214-0.156-1.547-0.467s-0.5-0.709-0.5-1.192c0-0.494,0.167-0.892,0.5-1.192s0.902-0.451,1.708-0.451l4.335-0.016 c0.795,0,1.361,0.153,1.699,0.459c0.338,0.306,0.508,0.706,0.508,1.2s-0.17,0.895-0.508,1.2C16.356,7.288,15.79,7.44,14.995,7.44 h-1.193v9.652c0,0.988,0.412,1.861,1.232,2.619c0.822,0.758,1.814,1.136,2.975,1.136c0.773,0,1.498-0.183,2.174-0.548 c0.678-0.365,1.23-0.896,1.66-1.595c0.268-0.44,0.402-0.978,0.402-1.611V7.44h-1.191c-0.795,0-1.361-0.153-1.701-0.459 c-0.338-0.306-0.506-0.706-0.506-1.2s0.168-0.895,0.506-1.2c0.34-0.307,0.906-0.459,1.701-0.459l4.334,0.016 c0.795,0,1.361,0.15,1.699,0.451c0.34,0.301,0.508,0.698,0.508,1.192c0,0.483-0.166,0.881-0.498,1.192 C26.763,7.285,26.247,7.44,25.55,7.44z"/></svg>', document.getElementById("iconUnderlineLinks").remove());
					let readingGuideIcon = document.getElementById("iconReadingGuide");
					readingGuideIcon && (readingGuideIcon.outerHTML = readingGuideIcon.outerHTML + '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve"><path d="M4,19.938c9.167,0,18.333,0,27.5,0c2.418,0,2.418-3.75,0-3.75c-9.167,0-18.333,0-27.5,0 C1.582,16.188,1.582,19.938,4,19.938L4,19.938z"/><rect x="3.084" y="-5.731" fill="none" width="29.749" height="31.047"/></svg>', document.getElementById("iconReadingGuide").remove());
					let menuResetIcon = document.getElementById("iconMenuReset");
					menuResetIcon && (menuResetIcon.outerHTML = menuResetIcon.outerHTML + '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve"><polygon points="18.125,4.026 18.125,13.93 11.276,8.723"/><path d="M16.25,4.026c0,3.301,0,6.603,0,9.904c0.94-0.54,1.881-1.079,2.821-1.619c-2.283-1.735-4.566-3.471-6.849-5.207 c0,1.08,0,2.159,0,3.238c2.283-1.566,4.566-3.132,6.849-4.697c1.98-1.358,0.107-4.61-1.893-3.238 c-2.283,1.566-4.566,3.132-6.849,4.697c-1.248,0.856-1.148,2.366,0,3.238c2.283,1.735,4.566,3.471,6.849,5.207 C18.353,16.442,20,15.221,20,13.93c0-3.301,0-6.603,0-9.904C20,1.607,16.25,1.607,16.25,4.026z"/><path d="M27.266,19.396c-0.58,10.777-16.139,10.777-16.719,0c-0.173-3.207-5.174-3.224-5,0 c0.407,7.557,5.803,12.954,13.36,13.361c7.541,0.406,12.985-6.417,13.359-13.361C32.439,16.173,27.438,16.19,27.266,19.396 L27.266,19.396z"/><path d="M32.266,19.838c-0.2-7.413-5.946-13.16-13.359-13.36c-3.226-0.087-3.218,4.913,0,5c4.657,0.125,8.233,3.703,8.359,8.36 C27.353,23.056,32.353,23.064,32.266,19.838L32.266,19.838z"/></svg>', document.getElementById("iconMenuReset").remove());
					let menuCloseIcon = document.getElementById("iconMenuClose");
					menuCloseIcon && (menuCloseIcon.outerHTML = menuCloseIcon.outerHTML + '<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve"><path fill="#010202" d="M28.362,27.23c-5.959-6.966-11.917-13.932-17.875-20.898c-1.572-1.837-4.421,0.6-2.85,2.437 c5.959,6.966,11.917,13.932,17.875,20.897C27.084,31.505,29.935,29.067,28.362,27.23L28.362,27.23z"/><path fill="#010202" d="M28.362,27.23c-5.959-6.966-11.917-13.932-17.875-20.898c-1.572-1.837-4.421,0.6-2.85,2.437 c5.959,6.966,11.917,13.932,17.875,20.897C27.084,31.505,29.935,29.067,28.362,27.23L28.362,27.23z"/><path fill="#010202" d="M28.362,27.23c-5.959-6.966-11.917-13.932-17.875-20.898c-1.572-1.837-4.421,0.6-2.85,2.437 c5.959,6.966,11.917,13.932,17.875,20.897C27.084,31.505,29.935,29.067,28.362,27.23L28.362,27.23z"/><path fill="#010202" d="M28.362,8.769c1.572-1.837-1.278-4.274-2.85-2.437c-5.959,6.966-11.916,13.932-17.875,20.899 c-1.572,1.836,1.277,4.273,2.85,2.438C16.444,22.702,22.403,15.735,28.362,8.769L28.362,8.769z"/></svg>', document.getElementById("iconMenuClose").remove());
					let accessMainIcon = document.getElementById("iconAccessMain");
					accessMainIcon && (accessMainIcon.outerHTML = accessMainIcon.outerHTML + '<svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M13.5 6.50024C13.5 7.32867 12.8284 8.00024 12 8.00024C11.1716 8.00024 10.5 7.32867 10.5 6.50024C10.5 5.67182 11.1716 5.00024 12 5.00024C12.8284 5.00024 13.5 5.67182 13.5 6.50024Z" fill="#0F0F0F"/>\n' +
            '<path d="M6.05132 8.68402C5.87667 9.20796 6.15983 9.77428 6.68377 9.94893C6.85906 10.0071 7.03576 10.0613 7.21265 10.1143C7.5363 10.2114 7.98911 10.3408 8.50746 10.4704C9.08908 10.6158 9.78094 10.7687 10.4783 10.8727C10.4323 11.7654 10.3205 12.4059 10.2166 12.8309L8.10557 17.053C7.85858 17.547 8.05881 18.1477 8.55279 18.3947C9.04677 18.6417 9.64744 18.4414 9.89443 17.9475L12 13.7363L14.1056 17.9475C14.3526 18.4414 14.9532 18.6417 15.4472 18.3947C15.9412 18.1477 16.1414 17.547 15.8944 17.053L13.7834 12.8309C13.6795 12.4059 13.5677 11.7654 13.5217 10.8727C14.2191 10.7687 14.9109 10.6158 15.4925 10.4704C16.0109 10.3408 16.4637 10.2114 16.7873 10.1143C16.963 10.0616 17.1384 10.0077 17.3125 9.95015C17.8261 9.77972 18.1201 9.19822 17.9487 8.68402C17.7741 8.16012 17.2078 7.87697 16.6839 8.05151C16.5277 8.10318 16.3703 8.15138 16.2127 8.19867C15.9113 8.28907 15.4891 8.40969 15.0075 8.5301C14.0216 8.77657 12.8709 9.00024 12 9.00024C11.1291 9.00024 9.97843 8.77657 8.99254 8.5301C8.51089 8.40969 8.0887 8.28907 7.78735 8.19867C7.63167 8.15196 7.47632 8.10404 7.32186 8.05342C6.80235 7.88161 6.22544 8.16164 6.05132 8.68402Z" fill="#0F0F0F"/>\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12.0002C23 18.0754 18.0751 23.0002 12 23.0002C5.92487 23.0002 1 18.0754 1 12.0002C1 5.92511 5.92487 1.00024 12 1.00024C18.0751 1.00024 23 5.92511 23 12.0002ZM3.00683 12.0002C3.00683 16.967 7.03321 20.9934 12 20.9934C16.9668 20.9934 20.9932 16.967 20.9932 12.0002C20.9932 7.03345 16.9668 3.00707 12 3.00707C7.03321 3.00707 3.00683 7.03345 3.00683 12.0002Z" fill="#0F0F0F"/>\n' +
            '</svg>', document.getElementById("iconAccessMain").remove());
					let textToSpeechIcon = document.getElementById("iconTextToSpeech");
					textToSpeechIcon && (textToSpeechIcon.outerHTML = textToSpeechIcon.outerHTML + '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36" enable-background="new 0 0 36 36" xml:space="preserve"><path d="M8.686,22.772c-1.882-0.343-3.149-1.621-3.542-3.608c-0.302-1.527-0.141-2.975,0.777-4.281c1.201-1.712,3.315-2.5,5.34-1.991c2.003,0.504,3.484,2.174,3.737,4.24c0.149,1.222-0.029,2.397-0.61,3.491c-0.613,1.154-1.57,1.857-2.861,2.097c-0.037,0.007-0.075,0.016-0.188,0.041c0.362,0.063,0.65,0.104,0.935,0.164c0.643,0.136,1.229,0.402,1.763,0.784c2.067,1.479,3.069,3.495,3.018,6.035c-0.013,0.639-0.427,1.062-1.059,1.063c-3.974,0.003-7.947,0.002-11.921-0.002c-0.651-0.001-1.06-0.424-1.067-1.076c-0.019-1.608,0.333-3.116,1.337-4.399c0.876-1.119,1.924-2.037,3.357-2.385C8.024,22.866,8.357,22.828,8.686,22.772z"/><path d="M32.994,16.649c-0.08,3.764-1.508,7.325-4.397,10.284c-0.303,0.311-0.662,0.437-1.084,0.298c-0.386-0.126-0.619-0.4-0.687-0.802c-0.06-0.358,0.064-0.656,0.319-0.915c1.039-1.053,1.896-2.238,2.525-3.581c1.333-2.848,1.647-5.805,0.906-8.862c-0.571-2.354-1.733-4.384-3.428-6.113c-0.579-0.591-0.366-1.498,0.397-1.721c0.423-0.124,0.774,0.014,1.078,0.324c1.09,1.112,1.994,2.357,2.705,3.743C32.456,11.498,32.982,13.834,32.994,16.649z"/><path d="M26.667,16.078c-0.053,2.567-0.881,4.639-2.549,6.365c-0.43,0.444-1.063,0.474-1.481,0.074c-0.421-0.4-0.412-1.022,0.016-1.48c1.854-1.989,2.402-4.296,1.636-6.9c-0.305-1.036-0.868-1.933-1.635-2.697c-0.302-0.302-0.403-0.661-0.267-1.068c0.133-0.396,0.422-0.625,0.832-0.687c0.34-0.051,0.63,0.067,0.868,0.311c1.325,1.355,2.155,2.965,2.453,4.839C26.614,15.302,26.638,15.777,26.667,16.078z"/><path d="M21.672,16.229c-0.021,1.323-0.48,2.454-1.415,3.381c-0.351,0.348-0.883,0.375-1.285,0.097c-0.383-0.264-0.536-0.787-0.345-1.221c0.055-0.123,0.141-0.238,0.232-0.338c1.04-1.133,1.041-2.672,0-3.814c-0.339-0.371-0.408-0.846-0.183-1.238c0.221-0.384,0.667-0.599,1.105-0.476c0.205,0.058,0.413,0.188,0.562,0.342C21.227,13.872,21.647,14.977,21.672,16.229z"/></svg>', document.getElementById("iconTextToSpeech").remove())
				}), 1), a.deployedObjects.set("._access-menu", !1), document.querySelector("._access-menu ._menu-close-btn").addEventListener("click", () => {
					this.toggleMenu()
				}, !1), document.querySelector("._access-menu ._menu-reset-btn").addEventListener("click", () => {
					this.resetAll()
				}, !1), e
			}

			addListeners() {
				// Handle buttons
				let e = document.querySelectorAll("._access-menu ul li button");
				for (let t = 0; t < e.length; t++) {
					e[t].addEventListener("click", e => {
						let t = e || window.event;
						this.invoke(t.currentTarget.getAttribute("data-access-action"))
					}, !1);

					// Add keyboard navigation
					e[t].addEventListener("keydown", e => {
						let t = e || window.event;
						if (t.keyCode === 13 || t.keyCode === 32) { // Enter or Space
							t.preventDefault();
							this.invoke(t.currentTarget.getAttribute("data-access-action"));
						} else if (t.keyCode === 38) { // Arrow Up
							t.preventDefault();
							this.navigateMenu(t.currentTarget, -1);
						} else if (t.keyCode === 40) { // Arrow Down
							t.preventDefault();
							this.navigateMenu(t.currentTarget, 1);
						} else if (t.keyCode === 27) { // Escape
							t.preventDefault();
							this.toggleMenu();
						}
					}, !1);
				}

				// Handle range inputs for text size controls
				let rangeInputs = document.querySelectorAll("._access-menu ul li input[type='range']");
				for (let i = 0; i < rangeInputs.length; i++) {
					rangeInputs[i].addEventListener("input", e => {
						let t = e || window.event;
						let action = t.currentTarget.getAttribute("data-access-action");
						let value = parseInt(t.currentTarget.value);

						if (action === "textSize") {
							// Value ranges from -6 to +6, where 0 is the middle (default)
							// Reset text size first
							this.resetTextSize();
							// Apply the new size based on the slider value
							// Each step represents approximately 33% change (200% / 6 steps)
							for (let j = 0; j < Math.abs(value); j++) {
								this.alterTextSize(value > 0);
							}

							// Update aria-label to reflect current state
							let percentage = Math.round((value / 6) * 200);
							let label = percentage === 0 ? "Normal text size" :
								(percentage > 0 ? `Text size increased by ${percentage}%` : `Text size decreased by ${Math.abs(percentage)}%`);
							t.currentTarget.setAttribute("aria-label", label);
						} else if (action === "textSpacing") {
							// Value ranges from -6 to +6, where 0 is the middle (default)
							// Reset text spacing first
							this.resetTextSpace();
							// Apply the new spacing based on the slider value
							// Each step represents approximately 100% change (600% / 6 steps)
							for (let j = 0; j < Math.abs(value); j++) {
								this.alterTextSpace(value > 0);
							}

							// Update aria-label to reflect current state
							let percentage = Math.round((value / 6) * 600);
							let label = percentage === 0 ? "Normal text spacing" :
								(percentage > 0 ? `Text spacing increased by ${percentage}%` : `Text spacing decreased by ${Math.abs(percentage)}%`);
							t.currentTarget.setAttribute("aria-label", label);
						} else if (action === "increaseText" || action === "decreaseText") {
							// Legacy support for old range inputs (if any remain)
							let diff = value - 3;
							this.resetTextSize();
							for (let j = 0; j < Math.abs(diff); j++) {
								this.alterTextSize(diff > 0);
							}
						}
					}, !1);

					// Add keyboard navigation for range inputs
					rangeInputs[i].addEventListener("keydown", e => {
						let t = e || window.event;
						if (t.keyCode === 27) { // Escape
							t.preventDefault();
							this.toggleMenu();
						}
					}, !1);
				}

				// Add keyboard navigation to icon
				this.icon.addEventListener("keydown", e => {
					let t = e || window.event;
					if (t.keyCode === 13 || t.keyCode === 32) { // Enter or Space
						t.preventDefault();
						this.toggleMenu();
					}
				}, !1);

				// Add keyboard navigation to close and reset buttons
				document.querySelector("._access-menu ._menu-close-btn").addEventListener("keydown", e => {
					let t = e || window.event;
					if (t.keyCode === 13 || t.keyCode === 32) { // Enter or Space
						t.preventDefault();
						this.toggleMenu();
					}
				}, !1);

				document.querySelector("._access-menu ._menu-reset-btn").addEventListener("keydown", e => {
					let t = e || window.event;
					if (t.keyCode === 13 || t.keyCode === 32) { // Enter or Space
						t.preventDefault();
						this.resetAll();
					}
				}, !1);
			}

			disableUnsupportedModules() {
				for (let e in this.options.modules) if (!this.options.modules[e]) {
					// Check for buttons first
					let t = document.querySelector('button[data-access-action="' + e + '"]');
					if (t) {
						t.classList.add("not-supported");
					} else {
						// Check for range inputs
						let r = document.querySelector('input[data-access-action="' + e + '"]');
						if (r) {
							r.classList.add("not-supported");
						}
					}

					// Handle combined textSize control when increaseText or decreaseText are disabled
					if (e === "increaseText" || e === "decreaseText") {
						let textSizeRange = document.querySelector('input[data-access-action="textSize"]');
						if (textSizeRange) {
							textSizeRange.classList.add("not-supported");
							// Also disable the parent li element
							let parentLi = textSizeRange.closest('li');
							if (parentLi) {
								parentLi.classList.add("not-supported");
							}
						}
					}

					// Handle combined textSpacing control when increaseTextSpacing or decreaseTextSpacing are disabled
					if (e === "increaseTextSpacing" || e === "decreaseTextSpacing") {
						let textSpacingRange = document.querySelector('input[data-access-action="textSpacing"]');
						if (textSpacingRange) {
							textSpacingRange.classList.add("not-supported");
							// Also disable the parent li element
							let parentLi = textSpacingRange.closest('li');
							if (parentLi) {
								parentLi.classList.add("not-supported");
							}
						}
					}
				}
			}

			resetAll() {
				this.menuInterface.textToSpeech(!0), this.menuInterface.speechToText(!0), this.menuInterface.underlineLinks(!0), this.menuInterface.grayHues(!0), this.menuInterface.invertColors(!0), this.menuInterface.bigCursor(!0), this.menuInterface.readingGuide(!0), this.resetTextSize(), this.resetTextSpace();

				// Reset textSize range slider to default value (0)
				let textSizeRange = document.querySelector('input[data-access-action="textSize"]');
				if (textSizeRange) {
					textSizeRange.value = "0";
					textSizeRange.setAttribute("aria-label", "Normal text size");
				}

				// Reset textSpacing range slider to default value (0)
				let textSpacingRange = document.querySelector('input[data-access-action="textSpacing"]');
				if (textSpacingRange) {
					textSpacingRange.value = "0";
					textSpacingRange.setAttribute("aria-label", "Normal text spacing");
				}
			}

			resetTextSize() {
				this.resetIfDefined(this.initialValues.body.fontSize, this.body.style, "fontSize"), void 0 !== this.htmlOrgFontSize && (this.html.style.fontSize = this.htmlOrgFontSize);
				let e = document.querySelectorAll("[data-init-font-size]");
				for (let t = 0; t < e.length; t++) e[t].style.fontSize = e[t].getAttribute("data-init-font-size"), e[t].removeAttribute("data-init-font-size");
				this.sessionState.textSize = 0, this.onChange(!0)
			}

			resetTextSpace() {
				this.resetIfDefined(this.initialValues.body.wordSpacing, this.body.style, "wordSpacing"), this.resetIfDefined(this.initialValues.body.letterSpacing, this.body.style, "letterSpacing");
				let e = document.querySelectorAll("[data-init-word-spacing]"),
					t = document.querySelectorAll("[data-init-letter-spacing]");
				for (let t = 0; t < e.length; t++) e[t].style.wordSpacing = e[t].getAttribute("data-init-word-spacing"), e[t].removeAttribute("data-init-word-spacing");
				for (let i = 0; i < t.length; i++) e[i].style.letterSpacing = e[i].getAttribute("data-init-letter-spacing"), e[i].removeAttribute("data-init-letter-spacing");
				this.sessionState.textSpace = 0, this.onChange(!0)
			}

			alterTextSize(e) {
				this.sessionState.textSize += e ? 1 : -1, this.onChange(!0);
				this.announceStatus(e ? "Text size increased" : "Text size decreased");
				let t = 2;
				if (e || (t *= -1), this.options.textPixelMode) {
					let e = document.querySelectorAll("*:not(._access)");
					for (let i = 0; i < e.length; i++) {
						let s = getComputedStyle(e[i]).fontSize;
						s && s.indexOf("px") > -1 && (e[i].getAttribute("data-init-font-size") || e[i].setAttribute("data-init-font-size", s), s = 1 * s.replace("px", "") + t, e[i].style.fontSize = s + "px")
					}
				} else if (this.options.textEmlMode) {
					let e = this.html.style.fontSize;
					e.indexOf("%") ? (e = 1 * e.replace("%", ""), this.html.style.fontSize = e + t + "%") : a.warn("Accessibility.textEmlMode, html element is not set in %.")
				} else {
					let e = a.getFormattedDim(getComputedStyle(this.body).fontSize);
					void 0 === this.initialValues.body.fontSize && (this.initialValues.body.fontSize = e.size + e.sufix), e && e.sufix && !isNaN(1 * e.size) && (this.body.style.fontSize = 1 * e.size + t + e.sufix)
				}
			}

			alterTextSpace(e) {
				this.sessionState.textSpace += e ? 1 : -1, this.onChange(!0);
				this.announceStatus(e ? "Text spacing increased" : "Text spacing decreased");
				let t = 1;
				if (e || (t *= -1), this.options.textPixelMode) {
					let e = document.querySelectorAll("*:not(._access)"),
						i = Array.prototype.slice.call(document.querySelectorAll("._access-menu *"));
					for (let s = 0; s < e.length; s++) {
						if (i.includes(e[s])) continue;
						let n = e[s].style.wordSpacing;
						n && n.indexOf("px") > -1 ? (e[s].getAttribute("data-init-word-spacing") || e[s].setAttribute("data-init-word-spacing", n), n = 1 * n.replace("px", "") + t, e[s].style.wordSpacing = n + "px") : (e[s].setAttribute("data-init-word-spacing", n), e[s].style.wordSpacing = t + "px");
						let o = e[s].style.letterSpacing;
						o && o.indexOf("px") > -1 ? (e[s].getAttribute("data-init-letter-spacing") || e[s].setAttribute("data-init-letter-spacing", o), o = 1 * o.replace("px", "") + t, e[s].style.letterSpacing = o + "px") : (e[s].setAttribute("data-init-letter-spacing", o), e[s].style.letterSpacing = t + "px")
					}
				} else {
					let e = a.getFormattedDim(getComputedStyle(this.body).wordSpacing);
					void 0 === this.initialValues.body.wordSpacing && (this.initialValues.body.wordSpacing = ""), e && e.sufix && !isNaN(1 * e.size) && (this.body.style.wordSpacing = 1 * e.size + t + e.sufix);
					let i = a.getFormattedDim(getComputedStyle(this.body).letterSpacing);
					void 0 === this.initialValues.body.letterSpacing && (this.initialValues.body.letterSpacing = ""), i && i.sufix && !isNaN(1 * i.size) && (this.body.style.letterSpacing = 1 * i.size + t + i.sufix)
				}
			}

			speechToText() {
				if (!("webkitSpeechRecognition" in window)) {
					this.announceStatus("Speech to text is not supported in this browser");
					return;
				}

				try {
					this.recognition = new webkitSpeechRecognition;
					this.recognition.continuous = !0;
					this.recognition.interimResults = !0;

					this.recognition.onstart = () => {
						this.body.classList.add("_access-listening");
						this.announceStatus("Listening for speech");
					};

					this.recognition.onend = () => {
						this.body.classList.remove("_access-listening");
					};

					this.recognition.onerror = (e) => {
						this.body.classList.remove("_access-listening");
						let errorMessage = "Speech recognition error";
						switch(e.error) {
							case 'no-speech':
								errorMessage = "No speech detected";
								break;
							case 'audio-capture':
								errorMessage = "Microphone not available";
								break;
							case 'not-allowed':
								errorMessage = "Microphone permission denied";
								break;
							case 'network':
								errorMessage = "Network error during speech recognition";
								break;
							default:
								errorMessage = "Speech recognition error: " + e.error;
						}
						this.announceStatus(errorMessage);
						a.warn("Speech recognition error: " + e.error);
					};

					this.recognition.onresult = e => {
						let t = "";
						if (void 0 !== e.results) {
							for (let i = e.resultIndex; i < e.results.length; ++i) e.results[i].isFinal && (t += e.results[i][0].transcript);
							if (t && this.speechToTextTarget) {
								this.speechToTextTarget.parentElement.classList.remove("_access-listening");
								if ("input" == this.speechToTextTarget.tagName.toLowerCase() || "textarea" == this.speechToTextTarget.tagName.toLowerCase()) {
									this.speechToTextTarget.value = t;
								} else if (null != this.speechToTextTarget.getAttribute("contenteditable")) {
									this.speechToTextTarget.innerText = t;
								}
								this.announceStatus("Text entered: " + t);
							}
						}
					};

					this.recognition.lang = this.options.speechToTextLang;
					this.recognition.start();
				} catch (error) {
					this.announceStatus("Failed to start speech recognition");
					a.warn("Speech recognition initialization error: " + error.message);
				}
			}

			textToSpeech(e) {
				if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
					this.announceStatus("Text to speech is not supported in this browser");
					return;
				}

				try {
					let t = new window.SpeechSynthesisUtterance(e);
					t.lang = this.options.textToSpeechLang;
					t.onend = e => {
						this.isReading = !1
					};
					t.onerror = e => {
						this.isReading = !1;
						this.announceStatus("Text to speech error occurred");
						a.warn("Text to speech error: " + e.error);
					};

					let i = window.speechSynthesis.getVoices(), s = !1;
					for (let e = 0; e < i.length; e++) if (i[e].lang === t.lang) {
						t.voice = i[e], s = !0;
						break
					}

					if (!s) {
						this.announceStatus("Text to speech language not supported, using default voice");
						a.warn("text to speech language not supported!");
					}

					window.speechSynthesis.speak(t);
					this.isReading = !0;
				} catch (error) {
					this.announceStatus("Text to speech failed to start");
					a.warn("Text to speech error: " + error.message);
				}
			}

			listen() {
				"object" == typeof l.recognition && "function" == typeof l.recognition.stop && l.recognition.stop(), l.speechToTextTarget = window.event.target, l.speechToText(window.event.target.innerText)
			}

			read(e) {
				try {
					(e = window.event || e || arguments[0]) && e.preventDefault && (e.preventDefault(), e.stopPropagation())
				} catch (e) {
				}
				l.isReading ? (window.speechSynthesis.cancel(), l.isReading = !1) : l.textToSpeech(window.event.target.innerText)
			}

			runHotkey(e) {
				switch (e) {
					case"toggleMenu":
						this.toggleMenu();
						break;
					default:
						this.menuInterface.hasOwnProperty(e) && this.options.modules[e] && this.menuInterface[e](!1)
				}
			}

			navigateMenu(currentElement, direction) {
				let menuItems = Array.from(document.querySelectorAll("._access-menu ul li:not(.not-supported)"));
				let currentIndex = menuItems.indexOf(currentElement);
				let nextIndex = currentIndex + direction;

				if (nextIndex < 0) {
					nextIndex = menuItems.length - 1;
				} else if (nextIndex >= menuItems.length) {
					nextIndex = 0;
				}

				if (menuItems[nextIndex]) {
					menuItems[nextIndex].focus();
				}
			}

			toggleMenu() {
				let isClosing = !this.menu.classList.contains("close");
				let prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

				// Update ARIA attributes
				this.icon.setAttribute("aria-expanded", isClosing ? "false" : "true");
				this.menu.setAttribute("aria-hidden", isClosing ? "true" : "false");

				if (this.menu.classList.contains("close")) {
					// Opening menu
					if (this.options.animations && this.options.animations.buttons && !prefersReducedMotion) {
						setTimeout(() => {
							this.menu.querySelector("ul").classList.toggle("before-collapse")
						}, 500);
						setTimeout(() => {
							this.menu.classList.toggle("close");
							// Focus first menu item when opening
							let firstMenuItem = document.querySelector("._access-menu ul li:not(.not-supported)");
							if (firstMenuItem) {
								firstMenuItem.focus();
							}
						}, 10);
					} else {
						// No animation or reduced motion
						this.menu.classList.toggle("close");
						let firstMenuItem = document.querySelector("._access-menu ul li:not(.not-supported)");
						if (firstMenuItem) {
							firstMenuItem.focus();
						}
					}
				} else {
					// Closing menu
					if (this.options.animations && this.options.animations.buttons && !prefersReducedMotion) {
						setTimeout(() => {
							this.menu.classList.toggle("close")
						}, 500);
						setTimeout(() => {
							this.menu.querySelector("ul").classList.toggle("before-collapse")
						}, 10);
					} else {
						this.menu.classList.toggle("close");
					}
					// Return focus to icon when closing
					this.icon.focus();
				}
			}

			invoke(e) {
				"function" == typeof this.menuInterface[e] && this.menuInterface[e]()
			}

			build() {
				this.initialValues = {
					underlineLinks: !1,
					textToSpeech: !1,
					bigCursor: !1,
					readingGuide: !1,
					body: {},
					html: {}
				}, this.body = document.body || document.getElementsByTagName("body")[0], this.html = document.documentElement || document.getElementsByTagName("html")[0], this.options.textEmlMode && this.initFontSize(), this.injectCss(), this.icon = this.injectIcon(), this.menu = this.injectMenu(), this.addListeners(), this.disableUnsupportedModules(), this.options.hotkeys.enabled && (document.onkeydown = function (e) {
					let t = Object.entries(l.options.hotkeys.keys).find((function (t) {
						let i = !0;
						for (var s = 0; s < t[1].length; s++) Number.isInteger(t[1][s]) ? e.keyCode != t[1][s] && (i = !1) : null != e[t[1][s]] && 0 != e[t[1][s]] || (i = !1);
						return i
					}));
					null != t && l.runHotkey(t[0])
				}), this.icon.addEventListener("click", () => {
					this.toggleMenu()
				}, !1), setTimeout(() => {
					this.icon.style.opacity = "1"
				}, 10), this.updateReadGuide = function (e) {
					let t = 0;
					t = "touchmove" == e.type ? e.changedTouches[0].clientY : e.y, document.getElementById("access_read_guide_bar").style.top = t - (parseInt(l.options.guide.height.replace("px")) + 5) + "px"
				}, this.menuInterface = {
					increaseText: () => {
						this.alterTextSize(!0)
					}, decreaseText: () => {
						this.alterTextSize(!1)
					}, increaseTextSpacing: () => {
						this.alterTextSpace(!0)
					}, decreaseTextSpacing: () => {
						this.alterTextSpace(!1)
					}, invertColors: e => {
						if (void 0 === this.initialValues.html.backgroundColor && (this.initialValues.html.backgroundColor = getComputedStyle(this.html).backgroundColor), void 0 === this.initialValues.html.color && (this.initialValues.html.color = getComputedStyle(this.html).color), e) return this.resetIfDefined(this.initialValues.html.backgroundColor, this.html.style, "backgroundColor"), this.resetIfDefined(this.initialValues.html.color, this.html.style, "color"), document.querySelector('._access-menu [data-access-action="invertColors"]').classList.remove("active"), this.initialValues.invertColors = !1, this.sessionState.invertColors = this.initialValues.invertColors, this.onChange(!0), this.html.style.filter = "", void this.announceStatus("Colors inverted off");
						document.querySelector('._access-menu [data-access-action="invertColors"]').classList.toggle("active"), this.initialValues.invertColors = !this.initialValues.invertColors, this.sessionState.invertColors = this.initialValues.invertColors, this.onChange(!0), this.initialValues.invertColors ? (this.initialValues.grayHues && this.menuInterface.grayHues(!0), this.html.style.filter = "invert(1)", this.announceStatus("Colors inverted on")) : (this.html.style.filter = "", this.announceStatus("Colors inverted off"))
					}, grayHues: e => {
						if (void 0 === this.initialValues.html.filter && (this.initialValues.html.filter = getComputedStyle(this.html).filter), void 0 === this.initialValues.html.webkitFilter && (this.initialValues.html.webkitFilter = getComputedStyle(this.html).webkitFilter), void 0 === this.initialValues.html.mozFilter && (this.initialValues.html.mozFilter = getComputedStyle(this.html).mozFilter), void 0 === this.initialValues.html.msFilter && (this.initialValues.html.msFilter = getComputedStyle(this.html).msFilter), e) return document.querySelector('._access-menu [data-access-action="grayHues"]').classList.remove("active"), this.initialValues.grayHues = !1, this.sessionState.grayHues = this.initialValues.grayHues, this.onChange(!0), this.resetIfDefined(this.initialValues.html.filter, this.html.style, "filter"), this.resetIfDefined(this.initialValues.html.webkitFilter, this.html.style, "webkitFilter"), this.resetIfDefined(this.initialValues.html.mozFilter, this.html.style, "mozFilter"), this.resetIfDefined(this.initialValues.html.msFilter, this.html.style, "msFilter"), void this.announceStatus("Gray hues off");
						let t;
						document.querySelector('._access-menu [data-access-action="grayHues"]').classList.toggle("active"), this.initialValues.grayHues = !this.initialValues.grayHues, this.sessionState.grayHues = this.initialValues.grayHues, this.onChange(!0), this.initialValues.grayHues ? (t = "grayscale(1)", this.initialValues.invertColors && this.menuInterface.invertColors(!0), this.announceStatus("Gray hues on")) : (t = "", this.announceStatus("Gray hues off")), this.html.style.webkitFilter = t, this.html.style.mozFilter = t, this.html.style.msFilter = t, this.html.style.filter = t
					}, underlineLinks: e => {
						let t = "_access-underline", i = () => {
							let e = document.querySelector("." + t);
							e && (e.parentElement.removeChild(e), a.deployedObjects.remove("." + t))
						};
						if (e) return this.initialValues.underlineLinks = !1, this.sessionState.underlineLinks = this.initialValues.underlineLinks, this.onChange(!0), document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.remove("active"), this.announceStatus("Underline links off"), i();
						if (document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.toggle("active"), this.initialValues.underlineLinks = !this.initialValues.underlineLinks, this.sessionState.underlineLinks = this.initialValues.underlineLinks, this.onChange(!0), this.initialValues.underlineLinks) {
							let e = "\n                    body a {\n                        text-decoration: underline !important;\n                    }\n                ";
							a.injectStyle(e, {className: t}), a.deployedObjects.set("." + t, !0), this.announceStatus("Underline links on")
						} else i()
					}, bigCursor: e => {
						if (e) return this.html.classList.remove("_access_cursor"), document.querySelector('._access-menu [data-access-action="bigCursor"]').classList.remove("active"), this.initialValues.bigCursor = !1, this.sessionState.bigCursor = !1, this.onChange(!0), void this.announceStatus("Big cursor off");
						document.querySelector('._access-menu [data-access-action="bigCursor"]').classList.toggle("active"), this.initialValues.bigCursor = !this.initialValues.bigCursor, this.sessionState.bigCursor = this.initialValues.bigCursor, this.onChange(!0), this.html.classList.toggle("_access_cursor"), this.announceStatus(this.initialValues.bigCursor ? "Big cursor on" : "Big cursor off")
					}, readingGuide: e => {
						if (e) return null != document.getElementById("access_read_guide_bar") && document.getElementById("access_read_guide_bar").remove(), document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.remove("active"), this.initialValues.readingGuide = !1, this.sessionState.readingGuide = this.initialValues.readingGuide, this.onChange(!0), document.body.removeEventListener("touchmove", this.updateReadGuide, !1), document.body.removeEventListener("mousemove", this.updateReadGuide, !1), void this.announceStatus("Reading guide off");
						if (document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.toggle("active"), this.initialValues.readingGuide = !this.initialValues.readingGuide, this.sessionState.readingGuide = this.initialValues.readingGuide, this.onChange(!0), this.initialValues.readingGuide) {
							let e = document.createElement("div");
							e.id = "access_read_guide_bar", e.classList.add("access_read_guide_bar"), document.body.append(e), document.body.addEventListener("touchmove", this.updateReadGuide, !1), document.body.addEventListener("mousemove", this.updateReadGuide, !1), this.announceStatus("Reading guide on")
						} else null != document.getElementById("access_read_guide_bar") && document.getElementById("access_read_guide_bar").remove(), document.body.removeEventListener("touchmove", this.updateReadGuide, !1), document.body.removeEventListener("mousemove", this.updateReadGuide, !1)
					}, textToSpeech: e => {
						this.onChange(!1);
						let t = "_access-text-to-speech", i = () => {
							let e = document.querySelector("." + t);
							e && (e.parentElement.removeChild(e), document.removeEventListener("click", this.read, !1), a.deployedObjects.remove("." + t))
						};
						if (e) return document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.remove("active"), this.initialValues.textToSpeech = !1, this.announceStatus("Text to speech off"), i();
						if (document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.toggle("active"), this.initialValues.textToSpeech = !this.initialValues.textToSpeech, this.initialValues.textToSpeech) {
							let e = `\n                        @media (prefers-reduced-motion: no-preference) {\n                            *:hover {\n                                box-shadow: 2px 2px 2px rgba(180,180,180,0.7);\n                                transition: box-shadow 0.2s ease;\n                            }\n                        }\n                        \n                        @media (prefers-reduced-motion: reduce) {\n                            *:hover {\n                                box-shadow: 2px 2px 2px rgba(180,180,180,0.7);\n                            }\n                        }\n                    `;
							a.injectStyle(e, {className: t}), a.deployedObjects.set("." + t, !0), document.addEventListener("click", this.read, !1), this.announceStatus("Text to speech on - click on any text to hear it")
						} else i()
					}, speechToText: e => {
						this.onChange(!1);
						let t = "_access-speech-to-text", i = () => {
							this.recognition && (this.recognition.stop(), this.body.classList.remove("_access-listening"));
							let e = document.querySelector("." + t);
							e && (e.parentElement.removeChild(e), a.deployedObjects.remove("." + t));
							let i = document.querySelectorAll("._access-mic");
							for (let e = 0; e < i.length; e++) i[e].removeEventListener("focus", this.listen, !1), i[e].classList.remove("_access-mic")
						};
						if (e) return document.querySelector('._access-menu [data-access-action="speechToText"]').classList.remove("active"), this.initialValues.speechToText = !1, this.announceStatus("Speech to text off"), i();
						if (document.querySelector('._access-menu [data-access-action="speechToText"]').classList.toggle("active"), this.initialValues.speechToText = !this.initialValues.speechToText, this.initialValues.speechToText) {
							let e = `\n                        body:after {\n                            content: ${this.options.icon.useEmojis ? '"🎤"' : '"mic"'};\n                            ${this.options.icon.useEmojis ? "" : "font-family: '" + this.options.icon.fontFamily + "';"}\n                            position: fixed;\n                            z-index: 1100;\n                            top: 1vw;\n                            right: 1vw;\n                            width: 36px;\n                            height: 36px;\n                            font-size: 30px;\n                            line-height: 36px;\n                            border-radius: 50%;\n                            background: rgba(255,255,255,0.7);\n                            display: flex;\n                            justify-content: center;\n                            aling-items: center;\n                        }\n\n                        @media (prefers-reduced-motion: no-preference) {\n                            body._access-listening:after {\n                                animation: _access-listening-animation 2s infinite ease;\n                            }\n                        }\n                        \n                        @media (prefers-reduced-motion: reduce) {\n                            body._access-listening:after {\n                                background-color: #EF9A9A !important;\n                            }\n                        }\n\n                        @keyframes _access-listening-animation {\n                            0%  {background-color: transparent;}\n                            50%  {background-color: #EF9A9A;}\n                        }\n                    `;
							a.injectStyle(e, {className: t}), a.deployedObjects.set("." + t, !0);
							let i = document.querySelectorAll('input[type="text"], input[type="search"], textarea, [contenteditable]');
							for (let e = 0; e < i.length; e++) i[e].addEventListener("blur", () => {
								"object" == typeof this.recognition && "function" == typeof this.recognition.stop && this.recognition.stop()
							}, !1), i[e].addEventListener("focus", this.listen, !1), i[e].parentElement.classList.add("_access-mic");
							this.announceStatus("Speech to text on - focus on text fields to start dictating")
						} else i()
					}
				}, this.createAriaLiveRegion(), this.options.session.persistent && this.setSessionFromCache()
			}

			createAriaLiveRegion() {
				let ariaLiveRegion = document.createElement("div");
				ariaLiveRegion.id = "_access-aria-live";
				ariaLiveRegion.setAttribute("aria-live", "polite");
				ariaLiveRegion.setAttribute("aria-atomic", "true");
				ariaLiveRegion.style.position = "absolute";
				ariaLiveRegion.style.left = "-10000px";
				ariaLiveRegion.style.width = "1px";
				ariaLiveRegion.style.height = "1px";
				ariaLiveRegion.style.overflow = "hidden";
				this.body.appendChild(ariaLiveRegion);
				this.ariaLiveRegion = ariaLiveRegion;
				a.deployedObjects.set("#_access-aria-live", !1);
			}

			announceStatus(message) {
				if (this.ariaLiveRegion) {
					this.ariaLiveRegion.textContent = message;
					// Clear after announcement to allow repeated messages
					setTimeout(() => {
						this.ariaLiveRegion.textContent = "";
					}, 1000);
				}
			}

			resetIfDefined(e, t, i) {
				void 0 !== e && (t[i] = e)
			}

			onChange(e) {
				e && this.options.session.persistent && this.saveSession()
			}

			saveSession() {
				c.set("_accessState", this.sessionState)
			}

			setSessionFromCache() {
				let e = c.get("_accessState");
				if (e) {
					if (e.textSize) {
						let t = e.textSize;
						if (t > 0) for (; t--;) this.alterTextSize(!0); else for (; t++;) this.alterTextSize(!1)
					}
					if (e.textSpace) {
						let t = e.textSpace;
						if (t > 0) for (; t--;) this.alterTextSpace(!0); else for (; t++;) this.alterTextSpace(!1)
					}
					e.invertColors && this.menuInterface.invertColors(), e.grayHues && this.menuInterface.grayHues(), e.underlineLinks && this.menuInterface.underlineLinks(), e.bigCursor && this.menuInterface.bigCursor(), e.readingGuide && this.menuInterface.readingGuide(), this.sessionState = e
				}
			}

			destroy() {
				let e = a.deployedObjects.getAll();
				for (let t of e) {
					let e = document.querySelector(t);
					e && e.parentElement.removeChild(e)
				}
			}
		}

		u.init = e => {
			a.warn('"Accessibility.init()" is deprecated! Please use "new Accessibility()" instead'), new u(e)
		};
		var d = u;
		window.Accessibility = d
	}])
}));
