
################### Sample Solution ###################
def loan_payment(principal, annual_interest_rate, duration):
    r = (annual_interest_rate/12)/100;
    n = duration*12;
    if annual_interest_rate == 0:
        MonthlyPayment = principal/n;
        return MonthlyPayment;
    if annual_interest_rate > 0:
        MonthlyPayment = principal*((r*(1+r)**n)/((1+r)**n-1));
        return MonthlyPayment;


def calculate_payment(principal, annual_interest_rate, duration , number_of_payments):
    r = annual_interest_rate/100/12;
    n = duration*12;
    p = number_of_payments;
    if annual_interest_rate == 0:
        RemainingLoanBalance = principal*(1-(p/n));
        return RemainingLoanBalance;
    if annual_interest_rate > 0:
        RemainingLoanBalance = principal*((1+r)**n-(1+r)**p)/((1+r)**n-1);
        return RemainingLoanBalance;    
    
principal = int(input("Enter loan amount:"));
annual_interest_rate = float(input("Enter annual interest rate (percent):)")); 
duration = int(input("Enter loan duration in years:"));

MonthlyPayment = loan_payment(principal, annual_interest_rate, duration);
print("LOAN AMOUNT:", int(principal), "INTEREST RATE (PERCENT):", int(annual_interest_rate));
print("DURATION (YEARS):", int(duration), "MONTHLY PAYMENT:", int(MonthlyPayment));
for i in range(1,duration+1):
    number_of_payments = 12*i;
    RemainingLoanBalance = calculate_payment(principal, annual_interest_rate, duration , number_of_payments);
    print("YEAR:", i, "BALANCE:", int(RemainingLoanBalance), "TOTAL PAYMENT", int(MonthlyPayment*12*i)); 
