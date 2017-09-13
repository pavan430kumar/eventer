import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import Router from '../router'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => Cookies.set(key, state, { expires: 1, secure: false })
        })
    ],
    state: {
        _loadEvents: [
        ],
        _user: [
        ],
        _fireUser: null,
        _isLoading: false,
        _error: null
    },
    getters: {
        loadEvents(state) {
            return state._loadEvents.sort((eventA, eventB) => {
                return eventA.date < eventB.date
            })
        },
        loadFeaturedEvents(state) {
            return state._loadEvents.slice(0, 2)
        },
        loadSelectedEvent(state) {
            return (eventId) => {
                return state._loadEvents.find((myEvent) => {
                    return myEvent.id == eventId
                })
            };
        },
        getUser(state) {
            return (userId) => {
                return state._user.find(user => {
                    return user.userId == userId
                })
            };
        },
        getFirebaseUser(state) {
            return state._fireUser
        },
        getIsLoading(state) {
            return state._isLoading
        },
        getError(state) {
            return state._error
        }
    },
    mutations: {
        getEvents(state, payload) {
            state._loadEvents = payload
        },
        createEvent(state, payload) {
            state._loadEvents.push(payload + 'mut')
        },
        getUserProfile(state, payload) {
            state._user.push(payload)
        },
        updateProfile(state, payload) {
            var userIndexKey = state._user.findIndex(user => {
                return user.userId === payload.userId
            })
            userIndexKey = (userIndexKey === -1) ? state._user.push(payload) : state._user[userIndexKey] = payload
        },
        setUser(state, payload) {
            state._fireUser = payload
        },
        setIsLoading(state, payload) {
            state._isLoading = payload
        },
        setError(state, payload) {
            state._error = payload
        },
        clearError(state) {
            state._error = null
        }
    },
    actions: {
        getEvents({ commit }) {
            commit('setIsLoading', true)
            firebase.database().ref('events').once('value')
                .then(
                data => {
                    const events = []
                    const obj = data.val()
                    for (let key in obj) {
                        events.push({
                            id: key,
                            title: obj[key].title,
                            location: obj[key].location,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            startTime: obj[key].startTime,
                            endTime: obj[key].endTime,
                            description: obj[key].description,
                            createdUser: obj[key].createdUser
                        })
                    }
                    commit('setIsLoading', false)
                    commit('getEvents', events)
                })
                .catch(
                err => { console.log(err) }
                )
        },
        createEvent({ commit, state }, payload) {
            var user = state._fireUser.userId
            const event = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                date: payload.date,
                startTime: payload.startTime,
                endTime: payload.endTime,
                description: payload.description,
                createdUser: user
            }
            firebase.database().ref('events').push(event)
                .then(
                data => {
                    var key = data.key
                    commit('createEvent', { ...event, id: key })
                })
                .catch(
                err => {
                    console.log(err)
                })
        },
        getUserProfile({ commit, state }) {
            return new Promise((resolve, reject) => {
            const currentUserId = state._fireUser.userId
            firebase.database().ref('users').once('value')
                .then(
                data => {
                    const obj = data.val()
                    var currentUserProfile = null
                    for (let key in obj) {
                        if (key == currentUserId) {
                            currentUserProfile = obj[key]
                        }
                    }
                    if (currentUserProfile !== null) {
                        commit('getUserProfile', { ...currentUserProfile, userId: currentUserId })
                    }
                    resolve(currentUserProfile);
                }
                )
                .catch(err => { console.log(err) })
            },
            error => {
                reject(error);
            })
        },
        updateProfile({ commit, state }, payload) {
            const updatedProfile = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                dob: payload.dob,
                email: payload.email,
                workEmail: payload.workEmail,
                phone: payload.phone,
                workPhone: payload.workPhone,
                street: payload.street,
                apt: payload.apt,
                city: payload.city,
                state: payload.state,
                zipcode: payload.zipcode,
                profilePic: payload.profilePic
            }
            const currentUserId = state._fireUser.userId
            console.log('firebase user Id' + currentUserId)
            var usersRef = firebase.database().ref('users')
            usersRef.child(currentUserId).set(updatedProfile)
                .then(
                data => {
                    commit('updateProfile', { ...updatedProfile, userId: currentUserId })
                    Router.push('/profile')
                })
                .catch(
                err => {
                    console.log(err)
                }
                )
        },
        signUpUser({ commit }, payload) {
            commit('setIsLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    const newUser = {
                        userId: user.uid
                    }
                    commit('setUser', newUser)
                    commit('setIsLoading', false)
                    Router.push('/welcome')
                }
                )
                .catch(
                err => {
                    commit('setIsLoading', false)
                    commit('setError', err)
                    console.log(err, err.message)
                }
                )
        },
        signInUser({ commit }, payload) {
            console.log('----In SignInUser------')
            commit('setIsLoading', true)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    const newUser = {
                        userId: user.uid
                    }
                    commit('setUser', newUser)
                    store.dispatch('getUserProfile').then(x=> Router.push('/'))
                    // .then(x => {
                    //     console.log('In process to dispatch')
                    //     Router.push('/')
                    // })
                    store.dispatch('getEvents')
                    commit('setIsLoading', false)
                    console.log('------Before push----------')
                    // Router.push('/')
                    console.log('------Out of  SignInUser----------')
                })
                .catch(
                err => {
                    commit('setIsLoading', false)
                    commit('setError', err)
                    console.log(err, err.message)
                })
        },
        signOutUser({ commit }) {
            commit('setIsLoading', true)
            firebase.auth().signOut().then(
                (x) => {
                    commit('setIsLoading', false)
                    Router.push('/signin')
                    commit('setUser', x)
                }
            )
        },
        clearError({ commit }) {
            commit('clearError')
        }
    }
})
