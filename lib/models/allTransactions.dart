class TransactionsModel {
  List<Transactions> transactions = [];

  TransactionsModel.fromJson(Map<String, dynamic> json) {
    if (json['transactions'] != null) {
      //  vehicles = new List<Vehicles>();
      json['transactions'].forEach((t) {
        transactions.add(new Transactions.fromJson(t));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.transactions != null) {
      data['transactions'] = this.transactions.map((t) => t.toJson()).toList();
    }
    return data;
  }
}

class Transactions {
  int? transactionId;
  String vehicle = '';
  String vehicleImage = '';
  int fine = 0;
  String paymentDate = '';
  String paymentStatus = '';
  String place = '';
  String adjustmentDate = '';
  String adjustmentTime = '';
  String isReported = '';

  Transactions.fromJson(Map<String, dynamic> json) {
    transactionId = json['transaction_id'];
    vehicle = json['vehicle'];
    vehicleImage = json['vehicle_image'];
    fine = json['fine'];
    paymentDate = json['payment_date'];
    paymentStatus = json['payment_status'];
    place = json['place'];
    adjustmentDate = json['adjustment_date'];
    adjustmentTime = json['adjustment_time'];
    isReported = json['is_reported'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['transaction_id'] = this.transactionId;
    data['vehicle'] = this.vehicle;
    data['vehicle_image'] = this.vehicleImage;
    data['fine'] = this.fine;
    data['payment_date'] = this.paymentDate;
    data['payment_status'] = this.paymentStatus;
    data['place'] = this.place;
    data['adjustment_date'] = this.adjustmentDate;
    data['adjustment_time'] = this.adjustmentTime;
    data['is_reported'] = this.isReported;
    return data;
  }
}
