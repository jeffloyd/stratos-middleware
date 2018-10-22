module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
const devConfig = {
    MONGO_URL: 'mongodb://localhost:27017/stratos-dev',
    JWT_SECRET: 'thisisasecret'
};
const testConfig = { MONGO_URL: 'mongodb://172.17.0.4:27017/stratos-test', JWT_SECRET: 'thisisasecret' };
const prodConfig = { MONGO_URL: 'mongodb://172.17.0.4:27017/stratos-prod', JWT_SECRET: 'thisisasecret' };
const defaultConfig = {
    PORT: process.env.PORT || 3000
};

function envConfig(env) {
    switch (env) {
        case 'development':
            return devConfig;
        case 'test':
            return testConfig;
        default:
            return prodConfig;
    }
}
//Take defaultConfig and make it a single object 
//So, we have concatenated two objects into one 
exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(7);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(27);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(26);

var _user = __webpack_require__(4);

var _user2 = _interopRequireDefault(_user);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//local Stratgey
const localOpts = { usernameField: 'email' };
const localStrategy = new _passportLocal2.default(localOpts, async (email, password, done) => {
    try {
        const user = await _user2.default.findOne({
            email
        });

        if (!user) {
            return done(null, false);
        }
        //else if (user.password != password) {
        else if (!user.authenticateUser(password)) {
                return done(null, false);
            }
        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});

//JWT Strategy
const jwtOpts = {
    jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: _constants2.default.JWT_SECRET
};

const jwtStrategy = new _passportJwt.Strategy(jwtOpts, async (payload, done) => {
    try {
        const user = await _user2.default.findById(payload._id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});

_passport2.default.use(localStrategy);
_passport2.default.use(jwtStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _bcryptNodejs = __webpack_require__(18);

var _jsonwebtoken = __webpack_require__(24);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = __webpack_require__(5);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        trim: true,
        validate: {
            validator(email) {
                return _validator2.default.isEmail(email);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    firstName: {
        type: String,
        required: [true, 'FirstName is required!'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required!'],
        trim: true
    },
    userName: {
        type: String,
        required: [true, 'UserName is required!'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password need to be longer!'],
        validate: {
            validator(password) {
                return _user.passwordReg.test(password);
            },
            message: '{VALUE} is not a valid password!'
        }
    }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});

UserSchema.methods = {
    _hashPassword(password) {
        return (0, _bcryptNodejs.hashSync)(password);
    },
    authenticateUser(password) {
        return (0, _bcryptNodejs.compareSync)(password, this.password);
    },
    createToken() {
        return _jsonwebtoken2.default.sign({
            _id: this._id
        }, _constants2.default.JWT_SECRET);
    },
    toAuthJSON() {
        return {
            _id: this._id,
            userName: this.userName,
            token: `JWT ${this.createToken()}`,
            email: this.email
        };
    },
    toJSON() {
        return {
            _id: this._id,
            userName: this.userName,
            email: this.email
        };
    }
};
exports.default = _mongoose2.default.model('User', UserSchema);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(23);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
exports.default = {
    signup: {
        email: _joi2.default.string().email().required(),
        password: _joi2.default.string().regex(passwordReg).required(),
        firstName: _joi2.default.string().required(),
        lastName: _joi2.default.string().required(),
        userName: _joi2.default.string().required()
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Removes the warning with promises 
_mongoose2.default.Promise = global.Promise;

//Connect the db with the url provided 
try {
    _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (err) {
    _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}
_mongoose2.default.connection.once('open', () => console.log('MongoDB Running')).on('error', e => {
    throw e;
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _morgan = __webpack_require__(25);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(19);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(20);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(22);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(7);

var _passport2 = _interopRequireDefault(_passport);

var _util = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
    if (isProd) {
        app.use((0, _compression2.default)());
        app.use((0, _helmet2.default)());
    }
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({
        extended: true
    }));
    app.use(_passport2.default.initialize());
    if (isDev) {
        app.use((0, _morgan2.default)('dev'));
    }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = __webpack_require__(17);

var _user2 = _interopRequireDefault(_user);

var _resource = __webpack_require__(15);

var _resource2 = _interopRequireDefault(_resource);

var _auth = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    app.use('/api/v1/users', _user2.default);
    app.use('/api/v1/resources', _resource2.default);
    app.get('/secured', _auth.authJwt, (req, res) => {
        res.send('JWT Protected Example');
    });
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(9);

var _middleware = __webpack_require__(10);

var _middleware2 = _interopRequireDefault(_middleware);

var _modules = __webpack_require__(11);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); // passing the app instance to middlewareConfig
/* eslint-disable no-console */

(0, _middleware2.default)(app);

app.get('/', (req, res) => {
  res.send('REST API for Stratos Middleware');
});
(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      Server running on port: ${_constants2.default.PORT}
      ---
      Running on ${process.env.NODE_ENV}
      ---
      Make something great
    `);
  }
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createResource = createResource;
exports.getResourceById = getResourceById;
exports.getResourceList = getResourceList;

var _resource = __webpack_require__(14);

var _resource2 = _interopRequireDefault(_resource);

var _httpStatus = __webpack_require__(6);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createResource(req, res) {
  try {
    const resource = await _resource2.default.createResource(req.body, req.user._id);
    return res.status(_httpStatus2.default.CREATED).json(resource);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

async function getResourceById(req, res) {
  try {
    const resource = await _resource2.default.findById(req.params.id).populate(`user`);
    return res.status(_httpStatus2.default.OK).json(resource);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
};

async function getResourceList(req, res) {
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);
  try {
    const resource = await _resource2.default.list({ limit, skip });
    return res.status(_httpStatus2.default.OK).json(resource);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ResourceSchema = new _mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        trim: true
    },
    user: {
        type: _mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });
ResourceSchema.statics = {
    createResource(args, user) {
        return this.create(Object.assign({}, args, { user
        }));
    },
    list({ skip = 0, limit = 5 } = {}) {
        return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user');
    }
};
ResourceSchema.methods = {
    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            location: this.location,
            user: this.user
        };
    }
};
exports.default = _mongoose2.default.model('Resource', ResourceSchema);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _auth = __webpack_require__(2);

var _resource = __webpack_require__(13);

var resourceController = _interopRequireWildcard(_resource);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//import validate   from 'express-validation';

const routes = new _express.Router();

routes.post('/', _auth.authJwt, resourceController.createResource);
routes.get(`/:id`, resourceController.getResourceById);
routes.get(`/`, resourceController.getResourceList);

exports.default = routes;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signUp = signUp;
exports.login = login;

var _user = __webpack_require__(4);

var _user2 = _interopRequireDefault(_user);

var _httpStatus = __webpack_require__(6);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signUp(req, res) {
    try {
        const user = await _user2.default.create(req.body);
        return res.status(_httpStatus2.default.CREATED).json(user.toAuthJSON());
    } catch (e) {
        return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
    }
}

function login(req, res, next) {
    res.status(_httpStatus2.default.OK).json(req.user.toAuthJSON());
    //createToken()
    return next();
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(21);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _auth = __webpack_require__(2);

var _user = __webpack_require__(16);

var userController = _interopRequireWildcard(_user);

var _user2 = __webpack_require__(5);

var _user3 = _interopRequireDefault(_user2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

routes.post('/signup', (0, _expressValidation2.default)(_user3.default.signup), userController.signUp);
routes.post('/login', _auth.authLocal, userController.login);
exports.default = routes;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })
/******/ ]);