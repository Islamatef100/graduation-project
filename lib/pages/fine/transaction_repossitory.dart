// import '../../models/allTransactions.dart';
// import '../../network/remote/dio_Helper.dart';

// class TransactionsRepository {
//   final DioHelper diohelper;

//   TransactionsRepository(this.diohelper);

//   Future<List<TransactionsModel>> getAllTransactions() async {
//     final transactions = await diohelper.getAllTransactions();
//     //loop on objects in transaction list from api
//     return transactions
//         .map((transaction) => TransactionsModel.fromJson(transaction))
//         .toList();
//   }
// }
