from .. import all_module as am
from .utils import make_serializable
import re

manager_bp = am.Blueprint('manager', __name__)


@manager_bp.route('/manager/query/<string:attribute>/', defaults={
    'query_param': ''}, methods=['GET'])
@manager_bp.route('/manager/query/<string:attribute>/<string:query_param>',
                  methods=['GET'])
@am.jwt_required
def manager_query(attribute, query_param):
    if not query_param:
        return am.jsonify({'msg': 'Empty query'}), 422
    user_type = am.get_jwt_identity()['user_type']
    if user_type != 'manager':
        return am.jsonify({'msg': 'unauthorized'}), 401

    attributes = {'email', 'username', 'first', 'last', 'account'}
    if attribute.lower() not in attributes:
        return am.jsonify({'msg': 'Invalid query attribute'}), 400

    query = attribute
    if query == 'account':
        query = 'accounts.account_number'
    elif query == 'first':
        query = 'first_name'
    elif query == 'last':
        query = 'last_name'
    query_param = query_param.lower()
    regex = re.compile(fr'.*{query_param}.*', re.IGNORECASE)
    result = am.clients.find({query: regex}, {'_id': False,
                                              'password': False})
    out = []
    for item in result:
        if item['user_type'] != 'manager':
            make_serializable(item)
            out.append(item)

    return am.jsonify({'results': out}), 200


@manager_bp.route('/manager/get', methods=['GET'])
@am.jwt_required
def get_all_client():
    user_type = am.get_jwt_identity()['user_type']
    if user_type != 'manager':
        return am.jsonify({'msg': 'unauthorized'}), 401

    results = am.clients.find({'username': {'$exists': True}},
                              {'username': True, 'first_name': True,
                               'last_name': True, 'email': True,
                               'user_type': True})
    out = []
    for result in results:
        result.pop('_id')
        if not result['user_type'] == 'manager':
            result.pop('user_type')
            out.append(result)

    return am.jsonify({'results': out}), 200


# @manager_bp.route('/accounts/close/<string:account_num>', methods=['DELETE'])
# @am.jwt_required
# def close_account(account_num):
#     print("IN MANAGER CLOSE ACCOUNT FUNCTION")
#     if not am.verify(account_num):
#         return am.jsonify({'msg': 'Invalid account number checksum'}), 422

#     query = {'accounts.account_number':account_num}
#     current_user_acc = am.clients.find_one(query)
#     current_user = current_user['username'] 

#     # current_user = am.get_jwt_identity()['username']

#     if account_num[0] == '4':
#         pre_update = am.clients.find_one_and_update(
#             {'username': current_user},
#             {'$unset': {'auto_pay': ''}}
#         )
#         jobs = pre_update.get('auto_pay', [])
#         for job in jobs:
#             scheduler.remove_job(job['job_id'], jobstore='mongo')

#     else:
#         query = {'username': current_user,
#                  'auto_pay.from': account_num}
#         autopay = am.clients.find_one(query,
#                                       {'auto_pay.$': True})
#         if autopay:
#             current_job = autopay['auto_pay'][0]
#             scheduler.remove_job(current_job['job_id'], jobstore='mongo')
#             am.clients.update_one(query,
#                                   {'$pull': {
#                                       'auto_pay': {'from': account_num}
#                                   }})

#     result = am.clients.update_one(
#         {'username': current_user},
#         {
#             '$pull': {
#                 'accounts': {'account_number': account_num}
#             }
#         }
#     )
#     if not result.modified_count:
#         return am.jsonify({'msg': 'Failed to close account'}), 409
#     return am.jsonify({'msg': f'Account {account_num} closed'}), 200


