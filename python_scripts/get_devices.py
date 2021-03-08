from getpass import getpass

from libdyson.cloud import DysonAccount
from libdyson.cloud.account import DysonAccountCN
from libdyson.exceptions import DysonOTPTooFrequently

print("Please choose your account region")
print("1: Mainland China")
print("2: Rest of the World")
region = input("Region [1/2]: ")

if region == "1":
    account = DysonAccountCN()
    mobile = input("Phone number: ")
    verify = account.login_mobile_otp(f"+86{mobile}")
    otp = input("Verification code: ")
    verify(otp)
elif region == "2":
    region = input("Region code: ")
    account = DysonAccount()
    email = input("Email: ")
    password = getpass()
    account.login_email_password(email, password, region)
else:
    print(f"Invalid input {region}")
    exit(1)

devices = account.devices()
for device in devices:
    print()
    print(f"Serial: {device.serial}")
    print(f"Name: {device.name}")
    print(f"Device Type: {device.product_type}")
    print(f"Credential: {device.credential}")
