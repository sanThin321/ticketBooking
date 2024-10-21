import Payment from '../model/payment.js'

export const processPayment = async (req, res) => {
    const { nameOnCard, accountNumber, email, bankService, amount, seat, agency } = req.body;
  
    try {
      const payment = new Payment({
        nameOnCard,
        accountNumber,
        email,
        bankService,
        amount,
        seat,
        agency,
      });
  
      await payment.save(); // Save payment to DB
  
      res.status(200).json({ message: 'Payment successful', payment });
    } catch (err) {
      res.status(500).json({ error: 'Failed to process payment' });
    }
};
export const bankDetails=async(req,res)=>{
    
}
