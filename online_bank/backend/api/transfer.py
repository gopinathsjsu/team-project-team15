from .. import all_module as am
from .utils import withdraw, deposit

transfer_bp = am.Blueprint('transfer', __name__)


@transfer_bp.route('/transfer', methods=['POST'])
@am.jwt_required
def transfer():
    data = am.request.get_json()

    if not data:
        return am.make_response("Bad Request, no data passed", 400)
    try:
        account_from = data['account_from']
        account_to = data['account_to']
        amount = data['amount']
    except KeyError:
        return am.jsonify({'msg': 'Bad Request, missing/misspelled key'}), 400

    if not isinstance(amount, float) and not isinstance(amount, int):
        return am.jsonify({'msg': 'Invalid input'}), 400

    amount = round(amount, 3)

    account_from = str(account_from)
    account_to = str(account_to)
    amount = abs(amount)

    if str(account_from) == str(account_to):
        return am.jsonify({'msg': 'accounts cannot be the same'}), 400

    if not am.clients.find_one({'accounts.account_number': account_from}) or \
            not \
            am.clients.find_one({'accounts.account_number': account_to}):
        return am.jsonify({'msg': 'Account does not exist'}), 400

    current_user = am.get_jwt_identity()['username']

    from_description = f'Transfer to {account_to[-4:]}'
    acc_from = withdraw(current_user, account_from, amount,
                        from_description)
    if not acc_from:
        return am.jsonify({'msg': 'withdraw from account failed'}), 409

    to_description = f'Transfer from {account_from[-4:]}'
    if account_to[0] == '4':
        to_description = 'Bill pay, ' + to_description
    acc_to = deposit({'$exists': True}, account_to, amount, to_description)

    return am.jsonify(
        {'from': account_from, 'to': account_to, 'amount': amount}), 200


@transfer_bp.route('/get_transaction', methods=['POST'])
# @am.jwt_required
def get_transaction_data():
    data = am.request.get_json()
    trans_id = data['acc_number']
    current_user = am.get_jwt_identity()['username']
    client = am.clients.find_one({'username': current_user},
                                 {'_id': False, 'password': False})

    clt_data = {}
    for key, value in client.items():
        clt_data[key] = value
    i = -1
    for account in clt_data['accounts']:
        i = i + 1
        clt_data['accounts'][i]['actual_transactions'] = []       
        for transaction in account['transactions']:
            print(transaction)
            if trans_id in transaction['description']:
                print(transaction)
                clt_data['accounts'][i]['actual_transactions'].append(transaction)
                continue
            else:
                continue

    make_serializable(clt_data)

    return clt_data