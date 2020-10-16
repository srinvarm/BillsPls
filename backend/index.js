const app = require('express')()
const path = require('path')
const Razorpay = require('razorpay')
const shortid = require('shortid')
const cors = require('cors')

app.use(cors())

const razorpay = new Razorpay({
    key_id: 'rzp_test_Hg664ZYjofFcwI',
    key_secret: 'tHVFWx3utEpJpbBjRpSoDoBK',
  });


app.get('/logo.svg', (req,res) => {
    res.sendFile(path.join(__dirname, 'logo.svg'))
})

app.post('/razorpay', async (req,res) => {

    const payment_capture = 1
    const amount = 70
    const currency = 'INR'
    
    const options = {
        amount : (amount * 100).toString(),
        currency,
        receipt : shortid.generate(),
        payment_capture,
    }
    //instance.orders.create({amount, currency, receipt, payment_capture, notes})
    try {
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id: response.id,
            currency : response.currency,
            amount : response.amount
        })
        console.log(res)
    } catch(err) {
        console.log(err)
    }

    
    console.log('ORDER CREATED')
    

})
app.listen(1337, () => {
    console.log('Listening on 1337')
})