/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure chai
chai.use(chaiHttp)
chai.should()

describe('Make sure that status is 200', () => {
  it('should return 200', done => {
    chai.request(app)
      .get('/')
      // eslint-disable-next-line node/handle-callback-err
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })
})

describe('Make sure register fails on no data', () => {
  it('should return 400', done => {
    chai.request(app)
      .post('/register')
      // eslint-disable-next-line node/handle-callback-err
      .end((err, res) => {
        res.should.have.status(400)
        //  res.body.should.be.a('object')
        done()
      })
  })
})