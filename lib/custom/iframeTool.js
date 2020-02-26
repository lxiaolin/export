/**
 * 通过 Jquery 的 find 方法获取其他 iFrame 的 Jquery 对象
 * @param index         目标 iFrame 的位置下标
 * @param selector      Jquery 选择器
 * @return {*|jQuery}   Jquery 对象
 */
function getJQueryFromOtherIframe(index, selector) {
    return $("iframe", parent.document).eq(index).contents().find(selector);
}

/**
 * 通过 Jquery 的 $ 方法获取其他 iFrame 的 Jquery 对象
 * @param index         目标 iFrame 的位置下标
 * @param selector      Jquery 选择器
 * @return {jQuery.fn.init}
 */
function getJQueryFromOtherIframe2(index, selector) {
    return $("iframe", parent.document).eq(index)[0].contentWindow.$(selector);
}

/**
 * 获取其他 iFrame 的 window 对象，通过该对象访问变量和方法
 * @param index         目标 iFrame 的位置下标
 * @return {WindowProxy | Window}
 */
function getWindowFromOtherIframe(index) {
    return $("iframe", parent.document).eq(index)[0].contentWindow;
}

/**
 * 通过 id 获取其他 iFrame 的 DOM 对象
 * Returns a reference to the first object with the specified value of the ID or NAME attribute.
 * @param index         目标 iFrame 的位置下标
 * @param elementId     String that specifies the ID value. Case-insensitive.
 * @return {HTMLElement}
 */
function getElementByIdFromOtherIframe(index, elementId) {
    return $("iframe", parent.document).eq(index)[0].contentWindow.document.getElementById(elementId);
}

/**
 * 通过 classNames 获取其他 iFrame 的 DOM 对象集
 * @param index         目标 iFrame 的位置下标
 * @param classNames
 * @return {HTMLCollectionOf<Element>}
 */
function getElementsByClassNameFromOtherIframe(index, classNames) {
    return $("iframe", parent.document).eq(index)[0].contentWindow.document.getElementsByClassName(classNames);
}

/**
 * 通过 elementName 获取其他 iFrame 的 DOM 对象集
 * Gets a collection of objects based on the value of the NAME or ID attribute.
 * @param index         目标 iFrame 的位置下标
 * @param elementName
 * @return {NodeListOf<HTMLElement>}
 */
function getElementsByNameFromOtherIframe(index, elementName) {
    return $("iframe", parent.document).eq(index)[0].contentWindow.document.getElementsByName(elementName);
}

/**
 * 通过 qualifiedName 获取其他 iFrame 的 DOM 对象集
 * Retrieves a collection of objects based on the specified element name.
 * @param index         目标 iFrame 的位置下标
 * @param qualifiedName Specifies the name of an element.
 * @return {HTMLCollectionOf<Element>}
 */
function getElementsByTagNameFromOtherIframe(index, qualifiedName) {
    return $("iframe", parent.document).eq(index)[0].contentWindow.document.getElementsByTagName(qualifiedName);
}

/**
 * 给其他 iFrame 添加事件监听
 * @param index         目标 iFrame 的位置下标
 * @param type
 * @param listener
 * @param options
 */
function addEventListenerToOtherIframe(index, type, listener, options) {
    $("iframe", parent.document).eq(index)[0].contentWindow.document.addEventListener(type, listener, options);
}

/**
 * 给其他 iFrame 移除事件监听
 * @param index         目标 iFrame 的位置下标
 * @param type
 * @param listener
 * @param options
 */
function removeEventListenerFromOtherIframe(index, type, listener, options) {
    $("iframe", parent.document).eq(index)[0].contentWindow.document.removeEventListener(type, listener, options);
}

/**
 * Gets a value indicating whether the object currently has focus.
 * @param index         目标 iFrame 的位置下标
 * @return {boolean}
 */
function hasFocusOfOtherIframe(index) {
    return $("iframe", parent.document).eq(index)[0].contentWindow.document.hasFocus();
}

/**
 * 获取 iFrame 的 window 对象，通过该对象访问变量和方法
 * @param index         目标 iFrame 的位置下标
 * @return {WindowProxy | Window}
 */
function getWindowOfIframe(index) {
    return document.getElementsByTagName("iframe").item(index).contentWindow;
}

