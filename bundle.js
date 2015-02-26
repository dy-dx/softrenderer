(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matricies
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}


var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}

module.exports = {
  GLMAT_EPSILON : GLMAT_EPSILON,
  GLMAT_ARRAY_TYPE : GLMAT_ARRAY_TYPE,
  GLMAT_RANDOM : GLMAT_RANDOM,
  glMatrix : glMatrix
};

},{}],2:[function(require,module,exports){
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {};

var GLMAT_ARRAY_TYPE = require('common').GLMAT_ARRAY_TYPE;
var GLMAT_EPSILON = require('common').GLMAT_EPSILON;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};

module.exports = mat4;

},{"common":1}],3:[function(require,module,exports){
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

var GLMAT_ARRAY_TYPE = require('common').GLMAT_ARRAY_TYPE;
var GLMAT_RANDOM = require('common').GLMAT_RANDOM;

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

module.exports = vec2;


},{"common":1}],4:[function(require,module,exports){
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};

var GLMAT_ARRAY_TYPE = require('common').GLMAT_ARRAY_TYPE;
var GLMAT_RANDOM = require('common').GLMAT_RANDOM;

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/*
* Rotate a 3D vector around the x-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/*
* Rotate a 3D vector around the y-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/*
* Rotate a 3D vector around the z-axis
* @param {vec3} out The receiving vec3
* @param {vec3} a The vec3 point to rotate
* @param {vec3} b The origin of the rotation
* @param {Number} c The angle of rotation
* @returns {vec3} out
*/
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

module.exports = vec3;


},{"common":1}],5:[function(require,module,exports){
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation 
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */
var vec4 = {};

var GLMAT_ARRAY_TYPE = require('common').GLMAT_ARRAY_TYPE;
var GLMAT_RANDOM = require('common').GLMAT_RANDOM;

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

module.exports = vec4;


},{"common":1}],6:[function(require,module,exports){
exports.positions=[[5.929688,4.125,0],[5.387188,4.125,2.7475],[5.2971,4.494141,2.70917],[5.832031,4.494141,0],[5.401602,4.617188,2.753633],[5.945313,4.617188,0],[5.614209,4.494141,2.844092],[6.175781,4.494141,0],[5.848437,4.125,2.94375],[6.429688,4.125,0],[3.899688,4.125,4.97],[3.830352,4.494141,4.900664],[3.910782,4.617188,4.981094],[4.074414,4.494141,5.144727],[4.254687,4.125,5.325],[1.677188,4.125,6.4575],[1.638858,4.494141,6.367412],[1.68332,4.617188,6.471914],[1.77378,4.494141,6.684522],[1.873438,4.125,6.91875],[-1.070312,4.125,7],[-1.070312,4.494141,6.902344],[-1.070312,4.617188,7.015625],[-1.070312,4.494141,7.246094],[-1.070312,4.125,7.5],[-1.070312,4.125,7],[-4.007656,4.125,6.4575],[-3.859572,4.494141,6.367412],[-1.070312,4.494141,6.902344],[-3.847676,4.617188,6.471914],[-1.070312,4.617188,7.015625],[-3.917371,4.494141,6.684522],[-1.070312,4.494141,7.246094],[-4.014062,4.125,6.91875],[-1.070312,4.125,7.5],[-6.209063,4.125,4.97],[-6.042168,4.494141,4.900664],[-6.0725,4.617188,4.981094],[-6.217675,4.494141,5.144727],[-6.395312,4.125,5.325],[-7.591093,4.125,2.7475],[-7.464421,4.494141,2.70917],[-7.550137,4.617188,2.753633],[-7.755822,4.494141,2.844092],[-7.989062,4.125,2.94375],[-8.070313,4.125,0],[-7.972656,4.494141,0],[-8.085938,4.617188,0],[-8.316406,4.494141,0],[-8.570313,4.125,0],[-8.070313,4.125,0],[-7.527812,4.125,-2.7475],[-7.437724,4.494141,-2.70917],[-7.972656,4.494141,0],[-7.542227,4.617188,-2.753633],[-8.085938,4.617188,0],[-7.754834,4.494141,-2.844092],[-8.316406,4.494141,0],[-7.989062,4.125,-2.94375],[-8.570313,4.125,0],[-6.040312,4.125,-4.97],[-5.970977,4.494141,-4.900664],[-6.051406,4.617188,-4.981094],[-6.215039,4.494141,-5.144727],[-6.395312,4.125,-5.325],[-3.817812,4.125,-6.4575],[-3.779482,4.494141,-6.367412],[-3.823945,4.617188,-6.471914],[-3.914404,4.494141,-6.684522],[-4.014062,4.125,-6.91875],[-1.070312,4.125,-7],[-1.070312,4.494141,-6.902344],[-1.070312,4.617188,-7.015625],[-1.070312,4.494141,-7.246094],[-1.070312,4.125,-7.5],[-1.070312,4.125,-7],[1.677188,4.125,-6.4575],[1.638858,4.494141,-6.367412],[-1.070312,4.494141,-6.902344],[1.68332,4.617188,-6.471914],[-1.070312,4.617188,-7.015625],[1.77378,4.494141,-6.684522],[-1.070312,4.494141,-7.246094],[1.873438,4.125,-6.91875],[-1.070312,4.125,-7.5],[3.899688,4.125,-4.97],[3.830352,4.494141,-4.900664],[3.910782,4.617188,-4.981094],[4.074414,4.494141,-5.144727],[4.254687,4.125,-5.325],[5.387188,4.125,-2.7475],[5.2971,4.494141,-2.70917],[5.401602,4.617188,-2.753633],[5.614209,4.494141,-2.844092],[5.848437,4.125,-2.94375],[5.929688,4.125,0],[5.832031,4.494141,0],[5.945313,4.617188,0],[6.175781,4.494141,0],[6.429688,4.125,0],[6.429688,4.125,0],[5.848437,4.125,2.94375],[6.695264,2.162109,3.304053],[7.347656,2.162109,0],[7.433985,0.234375,3.61836],[8.148438,0.234375,0],[7.956494,-1.623047,3.840674],[8.714844,-1.623047,0],[8.154688,-3.375,3.925],[8.929688,-3.375,0],[4.254687,4.125,5.325],[4.906446,2.162109,5.976758],[5.475,0.234375,6.545312],[5.877149,-1.623047,6.947461],[6.029688,-3.375,7.1],[1.873438,4.125,6.91875],[2.23374,2.162109,7.765576],[2.548047,0.234375,8.504297],[2.770362,-1.623047,9.026807],[2.854688,-3.375,9.225],[-1.070312,4.125,7.5],[-1.070312,2.162109,8.417969],[-1.070312,0.234375,9.21875],[-1.070312,-1.623047,9.785156],[-1.070312,-3.375,10],[-1.070312,4.125,7.5],[-4.014062,4.125,6.91875],[-4.374365,2.162109,7.765576],[-1.070312,2.162109,8.417969],[-4.688672,0.234375,8.504297],[-1.070312,0.234375,9.21875],[-4.910986,-1.623047,9.026807],[-1.070312,-1.623047,9.785156],[-4.995313,-3.375,9.225],[-1.070312,-3.375,10],[-6.395312,4.125,5.325],[-7.047071,2.162109,5.976758],[-7.615624,0.234375,6.545312],[-8.017773,-1.623047,6.947461],[-8.170312,-3.375,7.1],[-7.989062,4.125,2.94375],[-8.835889,2.162109,3.304053],[-9.57461,0.234375,3.61836],[-10.097119,-1.623047,3.840674],[-10.295313,-3.375,3.925],[-8.570313,4.125,0],[-9.488281,2.162109,0],[-10.289063,0.234375,0],[-10.855469,-1.623047,0],[-11.070313,-3.375,0],[-8.570313,4.125,0],[-7.989062,4.125,-2.94375],[-8.835889,2.162109,-3.304053],[-9.488281,2.162109,0],[-9.57461,0.234375,-3.61836],[-10.289063,0.234375,0],[-10.097119,-1.623047,-3.840674],[-10.855469,-1.623047,0],[-10.295313,-3.375,-3.925],[-11.070313,-3.375,0],[-6.395312,4.125,-5.325],[-7.047071,2.162109,-5.976758],[-7.615624,0.234375,-6.545312],[-8.017773,-1.623047,-6.947461],[-8.170312,-3.375,-7.1],[-4.014062,4.125,-6.91875],[-4.374365,2.162109,-7.765576],[-4.688672,0.234375,-8.504297],[-4.910986,-1.623047,-9.026807],[-4.995313,-3.375,-9.225],[-1.070312,4.125,-7.5],[-1.070312,2.162109,-8.417969],[-1.070312,0.234375,-9.21875],[-1.070312,-1.623047,-9.785156],[-1.070312,-3.375,-10],[-1.070312,4.125,-7.5],[1.873438,4.125,-6.91875],[2.23374,2.162109,-7.765576],[-1.070312,2.162109,-8.417969],[2.548047,0.234375,-8.504297],[-1.070312,0.234375,-9.21875],[2.770362,-1.623047,-9.026807],[-1.070312,-1.623047,-9.785156],[2.854688,-3.375,-9.225],[-1.070312,-3.375,-10],[4.254687,4.125,-5.325],[4.906446,2.162109,-5.976758],[5.475,0.234375,-6.545312],[5.877149,-1.623047,-6.947461],[6.029688,-3.375,-7.1],[5.848437,4.125,-2.94375],[6.695264,2.162109,-3.304053],[7.433985,0.234375,-3.61836],[7.956494,-1.623047,-3.840674],[8.154688,-3.375,-3.925],[6.429688,4.125,0],[7.347656,2.162109,0],[8.148438,0.234375,0],[8.714844,-1.623047,0],[8.929688,-3.375,0],[8.929688,-3.375,0],[8.154688,-3.375,3.925],[7.794336,-4.857422,3.77168],[8.539063,-4.857422,0],[7.001562,-5.953125,3.434375],[7.679688,-5.953125,0],[6.208789,-6.697266,3.09707],[6.820313,-6.697266,0],[5.848437,-7.125,2.94375],[6.429688,-7.125,0],[6.029688,-3.375,7.1],[5.752343,-4.857422,6.822656],[5.142187,-5.953125,6.2125],[4.532031,-6.697266,5.602344],[4.254687,-7.125,5.325],[2.854688,-3.375,9.225],[2.701367,-4.857422,8.864649],[2.364063,-5.953125,8.071875],[2.026758,-6.697266,7.279101],[1.873438,-7.125,6.91875],[-1.070312,-3.375,10],[-1.070312,-4.857422,9.609375],[-1.070312,-5.953125,8.75],[-1.070312,-6.697266,7.890625],[-1.070312,-7.125,7.5],[-1.070312,-3.375,10],[-4.995313,-3.375,9.225],[-4.841992,-4.857422,8.864649],[-1.070312,-4.857422,9.609375],[-4.504687,-5.953125,8.071875],[-1.070312,-5.953125,8.75],[-4.167383,-6.697266,7.279101],[-1.070312,-6.697266,7.890625],[-4.014062,-7.125,6.91875],[-1.070312,-7.125,7.5],[-8.170312,-3.375,7.1],[-7.892968,-4.857422,6.822656],[-7.282812,-5.953125,6.2125],[-6.672656,-6.697266,5.602344],[-6.395312,-7.125,5.325],[-10.295313,-3.375,3.925],[-9.934961,-4.857422,3.77168],[-9.142187,-5.953125,3.434375],[-8.349414,-6.697266,3.09707],[-7.989062,-7.125,2.94375],[-11.070313,-3.375,0],[-10.679688,-4.857422,0],[-9.820313,-5.953125,0],[-8.960938,-6.697266,0],[-8.570313,-7.125,0],[-11.070313,-3.375,0],[-10.295313,-3.375,-3.925],[-9.934961,-4.857422,-3.77168],[-10.679688,-4.857422,0],[-9.142187,-5.953125,-3.434375],[-9.820313,-5.953125,0],[-8.349414,-6.697266,-3.09707],[-8.960938,-6.697266,0],[-7.989062,-7.125,-2.94375],[-8.570313,-7.125,0],[-8.170312,-3.375,-7.1],[-7.892968,-4.857422,-6.822656],[-7.282812,-5.953125,-6.2125],[-6.672656,-6.697266,-5.602344],[-6.395312,-7.125,-5.325],[-4.995313,-3.375,-9.225],[-4.841992,-4.857422,-8.864649],[-4.504687,-5.953125,-8.071875],[-4.167383,-6.697266,-7.279101],[-4.014062,-7.125,-6.91875],[-1.070312,-3.375,-10],[-1.070312,-4.857422,-9.609375],[-1.070312,-5.953125,-8.75],[-1.070312,-6.697266,-7.890625],[-1.070312,-7.125,-7.5],[-1.070312,-3.375,-10],[2.854688,-3.375,-9.225],[2.701367,-4.857422,-8.864649],[-1.070312,-4.857422,-9.609375],[2.364063,-5.953125,-8.071875],[-1.070312,-5.953125,-8.75],[2.026758,-6.697266,-7.279101],[-1.070312,-6.697266,-7.890625],[1.873438,-7.125,-6.91875],[-1.070312,-7.125,-7.5],[6.029688,-3.375,-7.1],[5.752343,-4.857422,-6.822656],[5.142187,-5.953125,-6.2125],[4.532031,-6.697266,-5.602344],[4.254687,-7.125,-5.325],[8.154688,-3.375,-3.925],[7.794336,-4.857422,-3.77168],[7.001562,-5.953125,-3.434375],[6.208789,-6.697266,-3.09707],[5.848437,-7.125,-2.94375],[8.929688,-3.375,0],[8.539063,-4.857422,0],[7.679688,-5.953125,0],[6.820313,-6.697266,0],[6.429688,-7.125,0],[6.429688,-7.125,0],[5.848437,-7.125,2.94375],[5.691685,-7.400391,2.877056],[6.259766,-7.400391,0],[4.853868,-7.640625,2.520586],[5.351563,-7.640625,0],[2.783648,-7.810547,1.639761],[3.107422,-7.810547,0],[-1.070312,-7.875,0],[4.254687,-7.125,5.325],[4.134043,-7.400391,5.204355],[3.489219,-7.640625,4.559531],[1.895879,-7.810547,2.966191],[-1.070312,-7.875,0],[1.873438,-7.125,6.91875],[1.806743,-7.400391,6.761997],[1.450274,-7.640625,5.92418],[0.569448,-7.810547,3.85396],[-1.070312,-7.875,0],[-1.070312,-7.125,7.5],[-1.070312,-7.400391,7.330078],[-1.070312,-7.640625,6.421875],[-1.070312,-7.810547,4.177734],[-1.070312,-7.875,0],[-1.070312,-7.125,7.5],[-4.014062,-7.125,6.91875],[-3.947368,-7.400391,6.761997],[-1.070312,-7.400391,7.330078],[-3.590898,-7.640625,5.92418],[-1.070312,-7.640625,6.421875],[-2.710073,-7.810547,3.85396],[-1.070312,-7.810547,4.177734],[-1.070312,-7.875,0],[-6.395312,-7.125,5.325],[-6.274668,-7.400391,5.204355],[-5.629844,-7.640625,4.559531],[-4.036504,-7.810547,2.966191],[-1.070312,-7.875,0],[-7.989062,-7.125,2.94375],[-7.832309,-7.400391,2.877056],[-6.994492,-7.640625,2.520586],[-4.924272,-7.810547,1.639761],[-1.070312,-7.875,0],[-8.570313,-7.125,0],[-8.400391,-7.400391,0],[-7.492188,-7.640625,0],[-5.248047,-7.810547,0],[-1.070312,-7.875,0],[-8.570313,-7.125,0],[-7.989062,-7.125,-2.94375],[-7.832309,-7.400391,-2.877056],[-8.400391,-7.400391,0],[-6.994492,-7.640625,-2.520586],[-7.492188,-7.640625,0],[-4.924272,-7.810547,-1.639761],[-5.248047,-7.810547,0],[-1.070312,-7.875,0],[-6.395312,-7.125,-5.325],[-6.274668,-7.400391,-5.204355],[-5.629844,-7.640625,-4.559531],[-4.036504,-7.810547,-2.966191],[-1.070312,-7.875,0],[-4.014062,-7.125,-6.91875],[-3.947368,-7.400391,-6.761997],[-3.590898,-7.640625,-5.92418],[-2.710073,-7.810547,-3.85396],[-1.070312,-7.875,0],[-1.070312,-7.125,-7.5],[-1.070312,-7.400391,-7.330078],[-1.070312,-7.640625,-6.421875],[-1.070312,-7.810547,-4.177734],[-1.070312,-7.875,0],[-1.070312,-7.125,-7.5],[1.873438,-7.125,-6.91875],[1.806743,-7.400391,-6.761997],[-1.070312,-7.400391,-7.330078],[1.450274,-7.640625,-5.92418],[-1.070312,-7.640625,-6.421875],[0.569448,-7.810547,-3.85396],[-1.070312,-7.810547,-4.177734],[-1.070312,-7.875,0],[4.254687,-7.125,-5.325],[4.134043,-7.400391,-5.204355],[3.489219,-7.640625,-4.559531],[1.895879,-7.810547,-2.966191],[-1.070312,-7.875,0],[5.848437,-7.125,-2.94375],[5.691685,-7.400391,-2.877056],[4.853868,-7.640625,-2.520586],[2.783648,-7.810547,-1.639761],[-1.070312,-7.875,0],[6.429688,-7.125,0],[6.259766,-7.400391,0],[5.351563,-7.640625,0],[3.107422,-7.810547,0],[-1.070312,-7.875,0],[-9.070313,2.25,0],[-8.992188,2.425781,0.84375],[-11.47583,2.405457,0.84375],[-11.40625,2.232422,0],[-13.298828,2.263184,0.84375],[-13.132813,2.109375,0],[-14.421631,1.877014,0.84375],[-14.203125,1.775391,0],[-14.804688,1.125,0.84375],[-14.570313,1.125,0],[-8.820313,2.8125,1.125],[-11.628906,2.786134,1.125],[-13.664063,2.601563,1.125],[-14.902344,2.100586,1.125],[-15.320313,1.125,1.125],[-8.648438,3.199219,0.84375],[-11.781982,3.166809,0.84375],[-14.029297,2.939941,0.84375],[-15.383057,2.324158,0.84375],[-15.835938,1.125,0.84375],[-8.570313,3.375,0],[-11.851563,3.339844,0],[-14.195313,3.09375,0],[-15.601563,2.425781,0],[-16.070313,1.125,0],[-8.570313,3.375,0],[-8.648438,3.199219,-0.84375],[-11.781982,3.166809,-0.84375],[-11.851563,3.339844,0],[-14.029297,2.939941,-0.84375],[-14.195313,3.09375,0],[-15.383057,2.324158,-0.84375],[-15.601563,2.425781,0],[-15.835938,1.125,-0.84375],[-16.070313,1.125,0],[-8.820313,2.8125,-1.125],[-11.628906,2.786134,-1.125],[-13.664063,2.601563,-1.125],[-14.902344,2.100586,-1.125],[-15.320313,1.125,-1.125],[-8.992188,2.425781,-0.84375],[-11.47583,2.405457,-0.84375],[-13.298828,2.263184,-0.84375],[-14.421631,1.877014,-0.84375],[-14.804688,1.125,-0.84375],[-9.070313,2.25,0],[-11.40625,2.232422,0],[-13.132813,2.109375,0],[-14.203125,1.775391,0],[-14.570313,1.125,0],[-14.570313,1.125,0],[-14.804688,1.125,0.84375],[-14.588013,0.00705,0.84375],[-14.375,0.105469,0],[-13.90918,-1.275146,0.84375],[-13.757813,-1.125,0],[-12.724976,-2.540863,0.84375],[-12.671875,-2.355469,0],[-10.992188,-3.609375,0.84375],[-11.070313,-3.375,0],[-15.320313,1.125,1.125],[-15.056641,-0.209473,1.125],[-14.242188,-1.605469,1.125],[-12.841797,-2.94873,1.125],[-10.820313,-4.125,1.125],[-15.835938,1.125,0.84375],[-15.525269,-0.425995,0.84375],[-14.575195,-1.935791,0.84375],[-12.958618,-3.356598,0.84375],[-10.648438,-4.640625,0.84375],[-16.070313,1.125,0],[-15.738281,-0.524414,0],[-14.726563,-2.085938,0],[-13.011719,-3.541992,0],[-10.570313,-4.875,0],[-16.070313,1.125,0],[-15.835938,1.125,-0.84375],[-15.525269,-0.425995,-0.84375],[-15.738281,-0.524414,0],[-14.575195,-1.935791,-0.84375],[-14.726563,-2.085938,0],[-12.958618,-3.356598,-0.84375],[-13.011719,-3.541992,0],[-10.648438,-4.640625,-0.84375],[-10.570313,-4.875,0],[-15.320313,1.125,-1.125],[-15.056641,-0.209473,-1.125],[-14.242188,-1.605469,-1.125],[-12.841797,-2.94873,-1.125],[-10.820313,-4.125,-1.125],[-14.804688,1.125,-0.84375],[-14.588013,0.00705,-0.84375],[-13.90918,-1.275146,-0.84375],[-12.724976,-2.540863,-0.84375],[-10.992188,-3.609375,-0.84375],[-14.570313,1.125,0],[-14.375,0.105469,0],[-13.757813,-1.125,0],[-12.671875,-2.355469,0],[-11.070313,-3.375,0],[7.429688,-0.75,0],[7.429688,-1.394531,1.85625],[10.01123,-0.677124,1.676074],[9.828125,-0.199219,0],[11.101563,0.84668,1.279688],[10.867188,1.125,0],[11.723145,2.629761,0.883301],[11.4375,2.730469,0],[12.898438,4.125,0.703125],[12.429688,4.125,0],[7.429688,-2.8125,2.475],[10.414063,-1.728516,2.234766],[11.617188,0.234375,1.70625],[12.351563,2.408203,1.177734],[13.929688,4.125,0.9375],[7.429688,-4.230469,1.85625],[10.816895,-2.779907,1.676074],[12.132813,-0.37793,1.279688],[12.97998,2.186646,0.883301],[14.960938,4.125,0.703125],[7.429688,-4.875,0],[11,-3.257813,0],[12.367188,-0.65625,0],[13.265625,2.085938,0],[15.429688,4.125,0],[7.429688,-4.875,0],[7.429688,-4.230469,-1.85625],[10.816895,-2.779907,-1.676074],[11,-3.257813,0],[12.132813,-0.37793,-1.279688],[12.367188,-0.65625,0],[12.97998,2.186646,-0.883301],[13.265625,2.085938,0],[14.960938,4.125,-0.703125],[15.429688,4.125,0],[7.429688,-2.8125,-2.475],[10.414063,-1.728516,-2.234766],[11.617188,0.234375,-1.70625],[12.351563,2.408203,-1.177734],[13.929688,4.125,-0.9375],[7.429688,-1.394531,-1.85625],[10.01123,-0.677124,-1.676074],[11.101563,0.84668,-1.279688],[11.723145,2.629761,-0.883301],[12.898438,4.125,-0.703125],[7.429688,-0.75,0],[9.828125,-0.199219,0],[10.867188,1.125,0],[11.4375,2.730469,0],[12.429688,4.125,0],[12.429688,4.125,0],[12.898438,4.125,0.703125],[13.291077,4.346237,0.65918],[12.789063,4.335938,0],[13.525879,4.422729,0.5625],[13.054688,4.40625,0],[13.532898,4.350357,0.46582],[13.132813,4.335938,0],[13.242188,4.125,0.421875],[12.929688,4.125,0],[13.929688,4.125,0.9375],[14.395508,4.368896,0.878906],[14.5625,4.458984,0.75],[14.413086,4.38208,0.621094],[13.929688,4.125,0.5625],[14.960938,4.125,0.703125],[15.499939,4.391556,0.65918],[15.599121,4.495239,0.5625],[15.293274,4.413804,0.46582],[14.617188,4.125,0.421875],[15.429688,4.125,0],[16.001953,4.401855,0],[16.070313,4.511719,0],[15.693359,4.428224,0],[14.929688,4.125,0],[15.429688,4.125,0],[14.960938,4.125,-0.703125],[15.499939,4.391556,-0.65918],[16.001953,4.401855,0],[15.599121,4.495239,-0.5625],[16.070313,4.511719,0],[15.293274,4.413804,-0.46582],[15.693359,4.428224,0],[14.617188,4.125,-0.421875],[14.929688,4.125,0],[13.929688,4.125,-0.9375],[14.395508,4.368896,-0.878906],[14.5625,4.458984,-0.75],[14.413086,4.38208,-0.621094],[13.929688,4.125,-0.5625],[12.898438,4.125,-0.703125],[13.291077,4.346237,-0.65918],[13.525879,4.422729,-0.5625],[13.532898,4.350357,-0.46582],[13.242188,4.125,-0.421875],[12.429688,4.125,0],[12.789063,4.335938,0],[13.054688,4.40625,0],[13.132813,4.335938,0],[12.929688,4.125,0],[0.501414,7.628906,0.670256],[0.632813,7.628906,0],[-1.070312,7.875,0],[0.429278,7.03125,0.639395],[0.554688,7.03125,0],[-0.162029,6.292969,0.38696],[-0.085937,6.292969,0],[-0.147812,5.625,0.3925],[-0.070312,5.625,0],[0.140489,7.628906,1.210801],[-1.070312,7.875,0],[0.084844,7.03125,1.155156],[-0.370879,6.292969,0.699434],[-0.360312,5.625,0.71],[-0.400056,7.628906,1.571726],[-1.070312,7.875,0],[-0.430918,7.03125,1.49959],[-0.683352,6.292969,0.908284],[-0.677812,5.625,0.9225],[-1.070312,7.628906,1.703125],[-1.070312,7.875,0],[-1.070312,7.03125,1.625],[-1.070312,6.292969,0.984375],[-1.070312,5.625,1],[-1.740569,7.628906,1.571726],[-1.070312,7.628906,1.703125],[-1.070312,7.875,0],[-1.709707,7.03125,1.49959],[-1.070312,7.03125,1.625],[-1.457273,6.292969,0.908284],[-1.070312,6.292969,0.984375],[-1.462812,5.625,0.9225],[-1.070312,5.625,1],[-2.281113,7.628906,1.210801],[-1.070312,7.875,0],[-2.225469,7.03125,1.155156],[-1.769746,6.292969,0.699434],[-1.780312,5.625,0.71],[-2.642038,7.628906,0.670256],[-1.070312,7.875,0],[-2.569902,7.03125,0.639395],[-1.978596,6.292969,0.38696],[-1.992812,5.625,0.3925],[-2.773438,7.628906,0],[-1.070312,7.875,0],[-2.695313,7.03125,0],[-2.054687,6.292969,0],[-2.070312,5.625,0],[-2.642038,7.628906,-0.670256],[-2.773438,7.628906,0],[-1.070312,7.875,0],[-2.569902,7.03125,-0.639395],[-2.695313,7.03125,0],[-1.978596,6.292969,-0.38696],[-2.054687,6.292969,0],[-1.992812,5.625,-0.3925],[-2.070312,5.625,0],[-2.281113,7.628906,-1.210801],[-1.070312,7.875,0],[-2.225469,7.03125,-1.155156],[-1.769746,6.292969,-0.699434],[-1.780312,5.625,-0.71],[-1.740569,7.628906,-1.571726],[-1.070312,7.875,0],[-1.709707,7.03125,-1.49959],[-1.457273,6.292969,-0.908284],[-1.462812,5.625,-0.9225],[-1.070312,7.628906,-1.703125],[-1.070312,7.875,0],[-1.070312,7.03125,-1.625],[-1.070312,6.292969,-0.984375],[-1.070312,5.625,-1],[-0.400056,7.628906,-1.571726],[-1.070312,7.628906,-1.703125],[-1.070312,7.875,0],[-0.430918,7.03125,-1.49959],[-1.070312,7.03125,-1.625],[-0.683352,6.292969,-0.908284],[-1.070312,6.292969,-0.984375],[-0.677812,5.625,-0.9225],[-1.070312,5.625,-1],[0.140489,7.628906,-1.210801],[-1.070312,7.875,0],[0.084844,7.03125,-1.155156],[-0.370879,6.292969,-0.699434],[-0.360312,5.625,-0.71],[0.501414,7.628906,-0.670256],[-1.070312,7.875,0],[0.429278,7.03125,-0.639395],[-0.162029,6.292969,-0.38696],[-0.147812,5.625,-0.3925],[0.632813,7.628906,0],[-1.070312,7.875,0],[0.554688,7.03125,0],[-0.085937,6.292969,0],[-0.070312,5.625,0],[-0.070312,5.625,0],[-0.147812,5.625,0.3925],[1.034141,5.179688,0.895391],[1.210938,5.179688,0],[2.735,4.875,1.619062],[3.054688,4.875,0],[4.262891,4.570313,2.26914],[4.710938,4.570313,0],[4.925938,4.125,2.55125],[5.429688,4.125,0],[-0.360312,5.625,0.71],[0.549375,5.179688,1.619688],[1.858438,4.875,2.92875],[3.034375,4.570313,4.104687],[3.544688,4.125,4.615],[-0.677812,5.625,0.9225],[-0.174922,5.179688,2.104453],[0.54875,4.875,3.805313],[1.198828,4.570313,5.333203],[1.480938,4.125,5.99625],[-1.070312,5.625,1],[-1.070312,5.179688,2.28125],[-1.070312,4.875,4.125],[-1.070312,4.570313,5.78125],[-1.070312,4.125,6.5],[-1.070312,5.625,1],[-1.462812,5.625,0.9225],[-1.965703,5.179688,2.104453],[-1.070312,5.179688,2.28125],[-2.689375,4.875,3.805313],[-1.070312,4.875,4.125],[-3.339453,4.570313,5.333203],[-1.070312,4.570313,5.78125],[-3.621562,4.125,5.99625],[-1.070312,4.125,6.5],[-1.780312,5.625,0.71],[-2.69,5.179688,1.619688],[-3.999062,4.875,2.92875],[-5.174999,4.570313,4.104687],[-5.685312,4.125,4.615],[-1.992812,5.625,0.3925],[-3.174765,5.179688,0.895391],[-4.875625,4.875,1.619062],[-6.403516,4.570313,2.26914],[-7.066563,4.125,2.55125],[-2.070312,5.625,0],[-3.351562,5.179688,0],[-5.195313,4.875,0],[-6.851563,4.570313,0],[-7.570313,4.125,0],[-2.070312,5.625,0],[-1.992812,5.625,-0.3925],[-3.174765,5.179688,-0.895391],[-3.351562,5.179688,0],[-4.875625,4.875,-1.619062],[-5.195313,4.875,0],[-6.403516,4.570313,-2.26914],[-6.851563,4.570313,0],[-7.066563,4.125,-2.55125],[-7.570313,4.125,0],[-1.780312,5.625,-0.71],[-2.69,5.179688,-1.619688],[-3.999062,4.875,-2.92875],[-5.174999,4.570313,-4.104687],[-5.685312,4.125,-4.615],[-1.462812,5.625,-0.9225],[-1.965703,5.179688,-2.104453],[-2.689375,4.875,-3.805313],[-3.339453,4.570313,-5.333203],[-3.621562,4.125,-5.99625],[-1.070312,5.625,-1],[-1.070312,5.179688,-2.28125],[-1.070312,4.875,-4.125],[-1.070312,4.570313,-5.78125],[-1.070312,4.125,-6.5],[-1.070312,5.625,-1],[-0.677812,5.625,-0.9225],[-0.174922,5.179688,-2.104453],[-1.070312,5.179688,-2.28125],[0.54875,4.875,-3.805313],[-1.070312,4.875,-4.125],[1.198828,4.570313,-5.333203],[-1.070312,4.570313,-5.78125],[1.480938,4.125,-5.99625],[-1.070312,4.125,-6.5],[-0.360312,5.625,-0.71],[0.549375,5.179688,-1.619688],[1.858438,4.875,-2.92875],[3.034375,4.570313,-4.104687],[3.544688,4.125,-4.615],[-0.147812,5.625,-0.3925],[1.034141,5.179688,-0.895391],[2.735,4.875,-1.619062],[4.262891,4.570313,-2.26914],[4.925938,4.125,-2.55125],[-0.070312,5.625,0],[1.210938,5.179688,0],[3.054688,4.875,0],[4.710938,4.570313,0],[5.429688,4.125,0]];
exports.cells=[[0,1,2],[2,3,0],[3,2,4],[4,5,3],[5,4,6],[6,7,5],[7,6,8],[8,9,7],[1,10,11],[11,2,1],[2,11,12],[12,4,2],[4,12,13],[13,6,4],[6,13,14],[14,8,6],[10,15,16],[16,11,10],[11,16,17],[17,12,11],[12,17,18],[18,13,12],[13,18,19],[19,14,13],[15,20,21],[21,16,15],[16,21,22],[22,17,16],[17,22,23],[23,18,17],[18,23,24],[24,19,18],[25,26,27],[27,28,25],[28,27,29],[29,30,28],[30,29,31],[31,32,30],[32,31,33],[33,34,32],[26,35,36],[36,27,26],[27,36,37],[37,29,27],[29,37,38],[38,31,29],[31,38,39],[39,33,31],[35,40,41],[41,36,35],[36,41,42],[42,37,36],[37,42,43],[43,38,37],[38,43,44],[44,39,38],[40,45,46],[46,41,40],[41,46,47],[47,42,41],[42,47,48],[48,43,42],[43,48,49],[49,44,43],[50,51,52],[52,53,50],[53,52,54],[54,55,53],[55,54,56],[56,57,55],[57,56,58],[58,59,57],[51,60,61],[61,52,51],[52,61,62],[62,54,52],[54,62,63],[63,56,54],[56,63,64],[64,58,56],[60,65,66],[66,61,60],[61,66,67],[67,62,61],[62,67,68],[68,63,62],[63,68,69],[69,64,63],[65,70,71],[71,66,65],[66,71,72],[72,67,66],[67,72,73],[73,68,67],[68,73,74],[74,69,68],[75,76,77],[77,78,75],[78,77,79],[79,80,78],[80,79,81],[81,82,80],[82,81,83],[83,84,82],[76,85,86],[86,77,76],[77,86,87],[87,79,77],[79,87,88],[88,81,79],[81,88,89],[89,83,81],[85,90,91],[91,86,85],[86,91,92],[92,87,86],[87,92,93],[93,88,87],[88,93,94],[94,89,88],[90,95,96],[96,91,90],[91,96,97],[97,92,91],[92,97,98],[98,93,92],[93,98,99],[99,94,93],[100,101,102],[102,103,100],[103,102,104],[104,105,103],[105,104,106],[106,107,105],[107,106,108],[108,109,107],[101,110,111],[111,102,101],[102,111,112],[112,104,102],[104,112,113],[113,106,104],[106,113,114],[114,108,106],[110,115,116],[116,111,110],[111,116,117],[117,112,111],[112,117,118],[118,113,112],[113,118,119],[119,114,113],[115,120,121],[121,116,115],[116,121,122],[122,117,116],[117,122,123],[123,118,117],[118,123,124],[124,119,118],[125,126,127],[127,128,125],[128,127,129],[129,130,128],[130,129,131],[131,132,130],[132,131,133],[133,134,132],[126,135,136],[136,127,126],[127,136,137],[137,129,127],[129,137,138],[138,131,129],[131,138,139],[139,133,131],[135,140,141],[141,136,135],[136,141,142],[142,137,136],[137,142,143],[143,138,137],[138,143,144],[144,139,138],[140,145,146],[146,141,140],[141,146,147],[147,142,141],[142,147,148],[148,143,142],[143,148,149],[149,144,143],[150,151,152],[152,153,150],[153,152,154],[154,155,153],[155,154,156],[156,157,155],[157,156,158],[158,159,157],[151,160,161],[161,152,151],[152,161,162],[162,154,152],[154,162,163],[163,156,154],[156,163,164],[164,158,156],[160,165,166],[166,161,160],[161,166,167],[167,162,161],[162,167,168],[168,163,162],[163,168,169],[169,164,163],[165,170,171],[171,166,165],[166,171,172],[172,167,166],[167,172,173],[173,168,167],[168,173,174],[174,169,168],[175,176,177],[177,178,175],[178,177,179],[179,180,178],[180,179,181],[181,182,180],[182,181,183],[183,184,182],[176,185,186],[186,177,176],[177,186,187],[187,179,177],[179,187,188],[188,181,179],[181,188,189],[189,183,181],[185,190,191],[191,186,185],[186,191,192],[192,187,186],[187,192,193],[193,188,187],[188,193,194],[194,189,188],[190,195,196],[196,191,190],[191,196,197],[197,192,191],[192,197,198],[198,193,192],[193,198,199],[199,194,193],[200,201,202],[202,203,200],[203,202,204],[204,205,203],[205,204,206],[206,207,205],[207,206,208],[208,209,207],[201,210,211],[211,202,201],[202,211,212],[212,204,202],[204,212,213],[213,206,204],[206,213,214],[214,208,206],[210,215,216],[216,211,210],[211,216,217],[217,212,211],[212,217,218],[218,213,212],[213,218,219],[219,214,213],[215,220,221],[221,216,215],[216,221,222],[222,217,216],[217,222,223],[223,218,217],[218,223,224],[224,219,218],[225,226,227],[227,228,225],[228,227,229],[229,230,228],[230,229,231],[231,232,230],[232,231,233],[233,234,232],[226,235,236],[236,227,226],[227,236,237],[237,229,227],[229,237,238],[238,231,229],[231,238,239],[239,233,231],[235,240,241],[241,236,235],[236,241,242],[242,237,236],[237,242,243],[243,238,237],[238,243,244],[244,239,238],[240,245,246],[246,241,240],[241,246,247],[247,242,241],[242,247,248],[248,243,242],[243,248,249],[249,244,243],[250,251,252],[252,253,250],[253,252,254],[254,255,253],[255,254,256],[256,257,255],[257,256,258],[258,259,257],[251,260,261],[261,252,251],[252,261,262],[262,254,252],[254,262,263],[263,256,254],[256,263,264],[264,258,256],[260,265,266],[266,261,260],[261,266,267],[267,262,261],[262,267,268],[268,263,262],[263,268,269],[269,264,263],[265,270,271],[271,266,265],[266,271,272],[272,267,266],[267,272,273],[273,268,267],[268,273,274],[274,269,268],[275,276,277],[277,278,275],[278,277,279],[279,280,278],[280,279,281],[281,282,280],[282,281,283],[283,284,282],[276,285,286],[286,277,276],[277,286,287],[287,279,277],[279,287,288],[288,281,279],[281,288,289],[289,283,281],[285,290,291],[291,286,285],[286,291,292],[292,287,286],[287,292,293],[293,288,287],[288,293,294],[294,289,288],[290,295,296],[296,291,290],[291,296,297],[297,292,291],[292,297,298],[298,293,292],[293,298,299],[299,294,293],[300,301,302],[302,303,300],[303,302,304],[304,305,303],[305,304,306],[306,307,305],[307,306,308],[301,309,310],[310,302,301],[302,310,311],[311,304,302],[304,311,312],[312,306,304],[306,312,313],[309,314,315],[315,310,309],[310,315,316],[316,311,310],[311,316,317],[317,312,311],[312,317,318],[314,319,320],[320,315,314],[315,320,321],[321,316,315],[316,321,322],[322,317,316],[317,322,323],[324,325,326],[326,327,324],[327,326,328],[328,329,327],[329,328,330],[330,331,329],[331,330,332],[325,333,334],[334,326,325],[326,334,335],[335,328,326],[328,335,336],[336,330,328],[330,336,337],[333,338,339],[339,334,333],[334,339,340],[340,335,334],[335,340,341],[341,336,335],[336,341,342],[338,343,344],[344,339,338],[339,344,345],[345,340,339],[340,345,346],[346,341,340],[341,346,347],[348,349,350],[350,351,348],[351,350,352],[352,353,351],[353,352,354],[354,355,353],[355,354,356],[349,357,358],[358,350,349],[350,358,359],[359,352,350],[352,359,360],[360,354,352],[354,360,361],[357,362,363],[363,358,357],[358,363,364],[364,359,358],[359,364,365],[365,360,359],[360,365,366],[362,367,368],[368,363,362],[363,368,369],[369,364,363],[364,369,370],[370,365,364],[365,370,371],[372,373,374],[374,375,372],[375,374,376],[376,377,375],[377,376,378],[378,379,377],[379,378,380],[373,381,382],[382,374,373],[374,382,383],[383,376,374],[376,383,384],[384,378,376],[378,384,385],[381,386,387],[387,382,381],[382,387,388],[388,383,382],[383,388,389],[389,384,383],[384,389,390],[386,391,392],[392,387,386],[387,392,393],[393,388,387],[388,393,394],[394,389,388],[389,394,395],[396,397,398],[398,399,396],[399,398,400],[400,401,399],[401,400,402],[402,403,401],[403,402,404],[404,405,403],[397,406,407],[407,398,397],[398,407,408],[408,400,398],[400,408,409],[409,402,400],[402,409,410],[410,404,402],[406,411,412],[412,407,406],[407,412,413],[413,408,407],[408,413,414],[414,409,408],[409,414,415],[415,410,409],[411,416,417],[417,412,411],[412,417,418],[418,413,412],[413,418,419],[419,414,413],[414,419,420],[420,415,414],[421,422,423],[423,424,421],[424,423,425],[425,426,424],[426,425,427],[427,428,426],[428,427,429],[429,430,428],[422,431,432],[432,423,422],[423,432,433],[433,425,423],[425,433,434],[434,427,425],[427,434,435],[435,429,427],[431,436,437],[437,432,431],[432,437,438],[438,433,432],[433,438,439],[439,434,433],[434,439,440],[440,435,434],[436,441,442],[442,437,436],[437,442,443],[443,438,437],[438,443,444],[444,439,438],[439,444,445],[445,440,439],[446,447,448],[448,449,446],[449,448,450],[450,451,449],[451,450,452],[452,453,451],[453,452,454],[454,455,453],[447,456,457],[457,448,447],[448,457,458],[458,450,448],[450,458,459],[459,452,450],[452,459,460],[460,454,452],[456,461,462],[462,457,456],[457,462,463],[463,458,457],[458,463,464],[464,459,458],[459,464,465],[465,460,459],[461,466,467],[467,462,461],[462,467,468],[468,463,462],[463,468,469],[469,464,463],[464,469,470],[470,465,464],[471,472,473],[473,474,471],[474,473,475],[475,476,474],[476,475,477],[477,478,476],[478,477,479],[479,480,478],[472,481,482],[482,473,472],[473,482,483],[483,475,473],[475,483,484],[484,477,475],[477,484,485],[485,479,477],[481,486,487],[487,482,481],[482,487,488],[488,483,482],[483,488,489],[489,484,483],[484,489,490],[490,485,484],[486,491,492],[492,487,486],[487,492,493],[493,488,487],[488,493,494],[494,489,488],[489,494,495],[495,490,489],[496,497,498],[498,499,496],[499,498,500],[500,501,499],[501,500,502],[502,503,501],[503,502,504],[504,505,503],[497,506,507],[507,498,497],[498,507,508],[508,500,498],[500,508,509],[509,502,500],[502,509,510],[510,504,502],[506,511,512],[512,507,506],[507,512,513],[513,508,507],[508,513,514],[514,509,508],[509,514,515],[515,510,509],[511,516,517],[517,512,511],[512,517,518],[518,513,512],[513,518,519],[519,514,513],[514,519,520],[520,515,514],[521,522,523],[523,524,521],[524,523,525],[525,526,524],[526,525,527],[527,528,526],[528,527,529],[529,530,528],[522,531,532],[532,523,522],[523,532,533],[533,525,523],[525,533,534],[534,527,525],[527,534,535],[535,529,527],[531,536,537],[537,532,531],[532,537,538],[538,533,532],[533,538,539],[539,534,533],[534,539,540],[540,535,534],[536,541,542],[542,537,536],[537,542,543],[543,538,537],[538,543,544],[544,539,538],[539,544,545],[545,540,539],[546,547,548],[548,549,546],[549,548,550],[550,551,549],[551,550,552],[552,553,551],[553,552,554],[554,555,553],[547,556,557],[557,548,547],[548,557,558],[558,550,548],[550,558,559],[559,552,550],[552,559,560],[560,554,552],[556,561,562],[562,557,556],[557,562,563],[563,558,557],[558,563,564],[564,559,558],[559,564,565],[565,560,559],[561,566,567],[567,562,561],[562,567,568],[568,563,562],[563,568,569],[569,564,563],[564,569,570],[570,565,564],[571,572,573],[573,574,571],[574,573,575],[575,576,574],[576,575,577],[577,578,576],[578,577,579],[579,580,578],[572,581,582],[582,573,572],[573,582,583],[583,575,573],[575,583,584],[584,577,575],[577,584,585],[585,579,577],[581,586,587],[587,582,581],[582,587,588],[588,583,582],[583,588,589],[589,584,583],[584,589,590],[590,585,584],[586,591,592],[592,587,586],[587,592,593],[593,588,587],[588,593,594],[594,589,588],[589,594,595],[595,590,589],[596,597,598],[597,596,599],[599,600,597],[600,599,601],[601,602,600],[602,601,603],[603,604,602],[605,596,606],[596,605,607],[607,599,596],[599,607,608],[608,601,599],[601,608,609],[609,603,601],[610,605,611],[605,610,612],[612,607,605],[607,612,613],[613,608,607],[608,613,614],[614,609,608],[615,610,616],[610,615,617],[617,612,610],[612,617,618],[618,613,612],[613,618,619],[619,614,613],[620,621,622],[621,620,623],[623,624,621],[624,623,625],[625,626,624],[626,625,627],[627,628,626],[629,620,630],[620,629,631],[631,623,620],[623,631,632],[632,625,623],[625,632,633],[633,627,625],[634,629,635],[629,634,636],[636,631,629],[631,636,637],[637,632,631],[632,637,638],[638,633,632],[639,634,640],[634,639,641],[641,636,634],[636,641,642],[642,637,636],[637,642,643],[643,638,637],[644,645,646],[645,644,647],[647,648,645],[648,647,649],[649,650,648],[650,649,651],[651,652,650],[653,644,654],[644,653,655],[655,647,644],[647,655,656],[656,649,647],[649,656,657],[657,651,649],[658,653,659],[653,658,660],[660,655,653],[655,660,661],[661,656,655],[656,661,662],[662,657,656],[663,658,664],[658,663,665],[665,660,658],[660,665,666],[666,661,660],[661,666,667],[667,662,661],[668,669,670],[669,668,671],[671,672,669],[672,671,673],[673,674,672],[674,673,675],[675,676,674],[677,668,678],[668,677,679],[679,671,668],[671,679,680],[680,673,671],[673,680,681],[681,675,673],[682,677,683],[677,682,684],[684,679,677],[679,684,685],[685,680,679],[680,685,686],[686,681,680],[687,682,688],[682,687,689],[689,684,682],[684,689,690],[690,685,684],[685,690,691],[691,686,685],[692,693,694],[694,695,692],[695,694,696],[696,697,695],[697,696,698],[698,699,697],[699,698,700],[700,701,699],[693,702,703],[703,694,693],[694,703,704],[704,696,694],[696,704,705],[705,698,696],[698,705,706],[706,700,698],[702,707,708],[708,703,702],[703,708,709],[709,704,703],[704,709,710],[710,705,704],[705,710,711],[711,706,705],[707,712,713],[713,708,707],[708,713,714],[714,709,708],[709,714,715],[715,710,709],[710,715,716],[716,711,710],[717,718,719],[719,720,717],[720,719,721],[721,722,720],[722,721,723],[723,724,722],[724,723,725],[725,726,724],[718,727,728],[728,719,718],[719,728,729],[729,721,719],[721,729,730],[730,723,721],[723,730,731],[731,725,723],[727,732,733],[733,728,727],[728,733,734],[734,729,728],[729,734,735],[735,730,729],[730,735,736],[736,731,730],[732,737,738],[738,733,732],[733,738,739],[739,734,733],[734,739,740],[740,735,734],[735,740,741],[741,736,735],[742,743,744],[744,745,742],[745,744,746],[746,747,745],[747,746,748],[748,749,747],[749,748,750],[750,751,749],[743,752,753],[753,744,743],[744,753,754],[754,746,744],[746,754,755],[755,748,746],[748,755,756],[756,750,748],[752,757,758],[758,753,752],[753,758,759],[759,754,753],[754,759,760],[760,755,754],[755,760,761],[761,756,755],[757,762,763],[763,758,757],[758,763,764],[764,759,758],[759,764,765],[765,760,759],[760,765,766],[766,761,760],[767,768,769],[769,770,767],[770,769,771],[771,772,770],[772,771,773],[773,774,772],[774,773,775],[775,776,774],[768,777,778],[778,769,768],[769,778,779],[779,771,769],[771,779,780],[780,773,771],[773,780,781],[781,775,773],[777,782,783],[783,778,777],[778,783,784],[784,779,778],[779,784,785],[785,780,779],[780,785,786],[786,781,780],[782,787,788],[788,783,782],[783,788,789],[789,784,783],[784,789,790],[790,785,784],[785,790,791],[791,786,785]];

},{}],7:[function(require,module,exports){
var AHHHHH, Camera, Device, Mat4, Mesh, POINTS, SOLID, Teapot, Vec2, Vec3, Vec4, WIREFRAME, camera, canvas, cubeMesh, device, mesh, meshes, render, tick;

Vec2 = require('gl-matrix-vec2');

Vec3 = require('gl-matrix-vec3');

Vec4 = require('gl-matrix-vec4');

Mat4 = require('gl-matrix-mat4');

Teapot = require('teapot');

POINTS = location.search === '?points';

WIREFRAME = location.search === '?wireframe';

SOLID = location.search === '?solid';

AHHHHH = location.search === '?AHHHHH';

Camera = (function() {
  function Camera() {
    this.position = Vec3.create();
    this.target = Vec3.create();
  }

  return Camera;

})();

Mesh = (function() {
  function Mesh(name) {
    this.name = name;
    this.vertices = [];
    this.faces = [];
    this.normals = [];
    this.rotation = Vec3.create();
    this.position = Vec3.create();
  }

  Mesh.prototype.computeNormals = function() {
    var ab, cb, face, i, j, len, normal, ref, results, v1, v2, v3;
    ref = this.faces;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      face = ref[i];
      v1 = this.vertices[face[0]];
      v2 = this.vertices[face[1]];
      v3 = this.vertices[face[2]];
      cb = Vec3.subtract(Vec3.create(), v3, v2);
      ab = Vec3.subtract(Vec3.create(), v1, v2);
      normal = Vec3.cross(Vec3.create(), cb, ab);
      Vec3.normalize(normal, normal);
      results.push(this.normals[i] = normal);
    }
    return results;
  };

  return Mesh;

})();

Device = (function() {
  function Device(canvas1) {
    this.canvas = canvas1;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext('2d');
    this.depthbuffer = [];
  }

  Device.prototype.clear = function() {
    var i, j, ref, results;
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.width, this.height);
    this.backbuffer = this.context.getImageData(0, 0, this.width, this.height);
    results = [];
    for (i = j = 0, ref = this.width * this.height; j < ref; i = j += 1) {
      results.push(this.depthbuffer[i] = 1000000.0);
    }
    return results;
  };

  Device.prototype.present = function() {
    return this.context.putImageData(this.backbuffer, 0, 0);
  };

  Device.prototype.putPixel = function(x, y, z, color) {
    var index, index4;
    this.backbufferdata = this.backbuffer.data;
    index = (x >> 0) + (y >> 0) * this.width;
    index4 = index * 4;
    if (this.depthbuffer[index] < z) {
      return;
    }
    this.depthbuffer[index] = z;
    this.backbufferdata[index4 + 0] = color[0] * 255;
    this.backbufferdata[index4 + 1] = color[1] * 255;
    this.backbufferdata[index4 + 2] = color[2] * 255;
    return this.backbufferdata[index4 + 3] = color[3] * 255;
  };

  Device.prototype.project = function(coord, transMat, worldMat, normal) {
    var normal3DWorld, point, point3DWorld, w, x, y;
    point = Vec4.fromValues(coord[0], coord[1], coord[2], 1);
    point = Vec4.transformMat4(Vec4.create(), point, transMat);
    point3DWorld = Vec3.transformMat4(Vec3.create(), coord, worldMat);
    normal3DWorld = Vec3.transformMat4(Vec3.create(), normal, worldMat);
    w = point[3];
    point[0] /= w;
    point[1] /= w;
    point[2] /= w;
    x = (point[0] * this.width + this.width / 2.0) >> 0;
    y = (-point[1] * this.height + this.height / 2.0) >> 0;
    return {
      screen: Vec3.fromValues(x, y, point[2]),
      world: point3DWorld,
      normal: normal3DWorld
    };
  };

  Device.prototype.drawPoint = function(point, color) {
    var ref, ref1;
    color || (color = Vec4.fromValues(1, 1, 1, 1));
    if ((0 <= (ref = point[0]) && ref < this.width) && (0 <= (ref1 = point[1]) && ref1 < this.height)) {
      return this.putPixel(point[0], point[1], point[2], color);
    }
  };

  Device.prototype.drawLine = function(p0, p1) {
    var dist, midPoint, p0p1;
    p0p1 = Vec2.subtract(Vec2.create(), p1, p0);
    dist = Vec2.length(p0p1);
    if (dist < 2) {
      return;
    }
    midPoint = Vec2.scaleAndAdd(Vec2.create(), p0, p0p1, 0.5);
    this.drawPoint(midPoint);
    this.drawLine(p0, midPoint);
    return this.drawLine(midPoint, p1);
  };

  Device.prototype.drawBLine = function(p0, p1) {
    var dx, dy, e2, err, results, sx, sy, x0, x1, y0, y1;
    x0 = p0[0] >> 0;
    y0 = p0[1] >> 0;
    x1 = p1[0] >> 0;
    y1 = p1[1] >> 0;
    dx = Math.abs(x1 - x0);
    dy = Math.abs(y1 - y0);
    sx = x0 < x1 ? 1 : -1;
    sy = y0 < y1 ? 1 : -1;
    err = dx - dy;
    results = [];
    while (true) {
      this.drawPoint(Vec2.fromValues(x0, y0));
      if (x0 === x1 && y0 === y1) {
        break;
      }
      e2 = err * 2;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        results.push(y0 += sy);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Device.prototype.drawScanLine = function(x1, x2, y, z, color) {
    var j, ref, ref1, ref2, results, x;
    if (x1 > x2) {
      ref = [x2, x1], x1 = ref[0], x2 = ref[1];
    }
    if (AHHHHH) {
      color[2] = color[2] * Math.cos(y % 10 + tick / 2) + 0.3;
      color[1] = color[1] * Math.sin((x1 + x2) / 2 + tick / 8);
    }
    results = [];
    for (x = j = ref1 = x1 | 0, ref2 = x2 | 0; j <= ref2; x = j += 1) {
      results.push(this.drawPoint(Vec3.fromValues(x, y, z), color));
    }
    return results;
  };

  Device.prototype.render = function(camera, meshes) {
    var centerPoint, color, face, faceIndex, grayVal, index, j, len, light1, mesh, normal, projectedA, projectedB, projectedC, projectionMatrix, results, transformMatrix, up, vertex, vertexA, vertexB, vertexC, viewMatrix, worldMatrix;
    up = Vec3.fromValues(0, 1, 0);
    viewMatrix = Mat4.lookAt(Mat4.create(), camera.position, camera.target, up);
    projectionMatrix = Mat4.perspective(Mat4.create(), 0.78, this.width / this.height, 0.01, 100.0);
    results = [];
    for (index = j = 0, len = meshes.length; j < len; index = ++j) {
      mesh = meshes[index];
      worldMatrix = Mat4.identity(Mat4.create());
      Mat4.rotateZ(worldMatrix, worldMatrix, mesh.rotation[2]);
      Mat4.rotateY(worldMatrix, worldMatrix, mesh.rotation[1]);
      Mat4.rotateX(worldMatrix, worldMatrix, mesh.rotation[0]);
      Mat4.translate(worldMatrix, worldMatrix, mesh.position);
      transformMatrix = Mat4.create();
      Mat4.multiply(transformMatrix, projectionMatrix, viewMatrix);
      Mat4.multiply(transformMatrix, transformMatrix, worldMatrix);

      /* Naive line test */
      if (POINTS) {
        results.push((function() {
          var k, len1, ref, results1;
          ref = mesh.vertices;
          results1 = [];
          for (k = 0, len1 = ref.length; k < len1; k++) {
            vertex = ref[k];
            results1.push(this.drawPoint(this.project(vertex, transformMatrix, worldMatrix, Vec3.create()).screen));
          }
          return results1;
        }).call(this));

        /* Wireframe, Bresenham's */
      } else if (WIREFRAME) {
        results.push((function() {
          var k, len1, ref, results1;
          ref = mesh.faces;
          results1 = [];
          for (faceIndex = k = 0, len1 = ref.length; k < len1; faceIndex = ++k) {
            face = ref[faceIndex];
            vertexA = mesh.vertices[face[0]];
            vertexB = mesh.vertices[face[1]];
            vertexC = mesh.vertices[face[2]];
            normal = mesh.normals[faceIndex];
            projectedA = this.project(vertexA, transformMatrix, worldMatrix, normal);
            projectedB = this.project(vertexB, transformMatrix, worldMatrix, normal);
            projectedC = this.project(vertexC, transformMatrix, worldMatrix, normal);
            this.drawBLine(projectedA.screen, projectedB.screen);
            this.drawBLine(projectedB.screen, projectedC.screen);
            results1.push(this.drawBLine(projectedC.screen, projectedA.screen));
          }
          return results1;
        }).call(this));
      } else {
        results.push((function() {
          var k, len1, ref, results1;
          ref = mesh.faces;
          results1 = [];
          for (faceIndex = k = 0, len1 = ref.length; k < len1; faceIndex = ++k) {
            face = ref[faceIndex];
            vertexA = mesh.vertices[face[0]].slice();
            vertexB = mesh.vertices[face[1]].slice();
            vertexC = mesh.vertices[face[2]].slice();
            normal = mesh.normals[faceIndex];
            if (AHHHHH) {
              vertexA[1] = vertexA[1] + Math.sin((vertexA[0] * 1.5 + tick) / 10) * 3.1;
              vertexB[1] = vertexB[1] + Math.sin((vertexB[0] * 1.5 + tick) / 10) * 3.1;
              vertexC[1] = vertexC[1] + Math.sin((vertexC[0] * 1.5 + tick) / 10) * 3.1;
            }
            projectedA = this.project(vertexA, transformMatrix, worldMatrix, normal);
            projectedB = this.project(vertexB, transformMatrix, worldMatrix, normal);
            projectedC = this.project(vertexC, transformMatrix, worldMatrix, normal);
            centerPoint = Vec3.add(Vec3.create(), projectedA.world, projectedB.world);
            Vec3.add(centerPoint, centerPoint, projectedC.world);
            Vec3.scale(centerPoint, centerPoint, 1 / 3);
            light1 = Vec3.fromValues(-10, 20, 30);
            Vec3.subtract(light1, light1, centerPoint);
            Vec3.normalize(light1, light1);
            grayVal = Math.max(0, Vec3.dot(projectedA.normal, light1));
            if (SOLID) {
              grayVal = 1;
            }
            color = Vec4.fromValues(grayVal, grayVal, grayVal, 1);
            results1.push(this.drawTriangle(projectedA.screen, projectedB.screen, projectedC.screen, color));
          }
          return results1;
        }).call(this));
      }
    }
    return results;
  };

  Device.prototype._fillBottomFlatTriangle = function(v1, v2, v3, color) {
    var curx1, curx2, invSlope1, invSlope2, j, ref, ref1, results, scanlineY, z;
    invSlope1 = (v2[0] - v1[0]) / (v2[1] - v1[1]);
    invSlope2 = (v3[0] - v1[0]) / (v3[1] - v1[1]);
    curx1 = v1[0];
    curx2 = v1[0];
    results = [];
    for (scanlineY = j = ref = v1[1], ref1 = v2[1]; j <= ref1; scanlineY = j += 1) {
      z = Math.min(v1[2], v2[2], v3[2]);
      this.drawScanLine(curx1, curx2, scanlineY, z, color);
      curx1 += invSlope1;
      results.push(curx2 += invSlope2);
    }
    return results;
  };

  Device.prototype._fillTopFlatTriangle = function(v1, v2, v3, color) {
    var curx1, curx2, invSlope1, invSlope2, j, ref, ref1, results, scanlineY, z;
    invSlope1 = (v3[0] - v1[0]) / (v3[1] - v1[1]);
    invSlope2 = (v3[0] - v2[0]) / (v3[1] - v2[1]);
    curx1 = v3[0];
    curx2 = v3[0];
    results = [];
    for (scanlineY = j = ref = v3[1], ref1 = v1[1]; j >= ref1; scanlineY = j += -1) {
      z = Math.min(v1[2], v2[2], v3[2]);
      this.drawScanLine(curx1, curx2, scanlineY, z, color);
      curx1 -= invSlope1;
      results.push(curx2 -= invSlope2);
    }
    return results;
  };

  Device.prototype.drawTriangle = function(v1, v2, v3, color) {
    var ref, ref1, ref2, v4;
    if (v1[1] > v2[1]) {
      ref = [v2, v1], v1 = ref[0], v2 = ref[1];
    }
    if (v2[1] > v3[1]) {
      ref1 = [v3, v2], v2 = ref1[0], v3 = ref1[1];
    }
    if (v1[1] > v2[1]) {
      ref2 = [v2, v1], v1 = ref2[0], v2 = ref2[1];
    }
    if (v1[1] === v2[1]) {
      return this._fillTopFlatTriangle(v1, v2, v3, color);
    } else if (v2[1] === v3[1]) {
      return this._fillBottomFlatTriangle(v1, v2, v3, color);
    } else {
      v4 = Vec3.fromValues(v1[0] + ((v2[1] - v1[1]) / (v3[1] - v1[1])) * (v3[0] - v1[0]), v2[1], v2[2]);
      v4[0] = v4[0] | 0;
      this._fillBottomFlatTriangle(v1, v2, v4, color);
      return this._fillTopFlatTriangle(v2, v4, v3, color);
    }
  };

  return Device;

})();

canvas = document.getElementById('front-buffer');

device = new Device(canvas);

camera = new Camera();

meshes = [];

cubeMesh = new Mesh("Cube", 8, 12);

cubeMesh.vertices = [[-10, 10, 10], [10, 10, 10], [-10, -10, 10], [10, -10, 10], [-10, 10, -10], [10, 10, -10], [10, -10, -10], [-10, -10, -10]];

cubeMesh.faces = [[0, 1, 2], [1, 2, 3], [1, 3, 6], [1, 5, 6], [0, 1, 4], [1, 4, 5], [2, 3, 7], [3, 6, 7], [0, 2, 7], [0, 4, 7], [4, 5, 6], [4, 6, 7]];

mesh = new Mesh('Teapot');

mesh.vertices = Teapot.positions;

mesh.faces = Teapot.cells;

mesh.computeNormals();

meshes.push(mesh);

camera.position = Vec3.fromValues(0, 0, 80);

camera.target = Vec3.fromValues(0, 0, 0);

tick = 0;

render = function() {
  tick += 1;
  device.clear();
  mesh.rotation[1] += 0.02;
  device.render(camera, meshes);
  device.present();
  return requestAnimationFrame(render);
};

render();


},{"gl-matrix-mat4":2,"gl-matrix-vec2":3,"gl-matrix-vec3":4,"gl-matrix-vec4":5,"teapot":6}]},{},[7]);
