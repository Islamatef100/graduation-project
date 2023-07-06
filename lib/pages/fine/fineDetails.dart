import 'package:carta/models/allCarsmodel.dart';
import 'package:carta/models/allTransactions.dart';
import 'package:carta/pages/fine/finesCubit/fineCubit.dart';
import 'package:carta/pages/fine/payment.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../Layout/layoutCubit.dart';
import '../../network/remote/dio_Helper.dart';
import '../../shared/Components/components.dart';
import '../../shared/constants/constants.dart';

import 'package:http/http.dart' as http;

class tDetail extends StatelessWidget {
  late Transactions tt;

  tDetail({
    Key? key,
    required this.tt,
  }) : super(key: key);

  Future<void> transactionreport() async {
    var headers = {
      'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfc3NuIjoiMzAxMTAzMDIzMDAxMTMiLCJ1c2VyX25hbWUiOiJnZW9yZ2UiLCJtYW51ZmFjdHVyZXJfbnVtYmVyIjoiMSIsInVzZXJfZW1haWwiOiJnZW9yZ2VAYWRtaW4uY29tIiwidXNlcl9wYXNzd29yZCI6IiQyYiQxMCR2cUJXaFkweDFSbjFYUU1GdWpBaE4uM3lqa3pFWHMvZkhYbXRHaEZaSC5ub1RVak9tejBibSIsInVzZXJfYWRkcmVzcyI6ImZheW91bSIsInVzZXJfam9iIjoic3R1ZGVudCIsInVzZXJfbmF0aW9uYWxpdHkiOiJFZ3lwdGlhbiIsInVzZXJfcGhvbmUiOiIwMTAyNzgyNzY1NCIsInVzZXJfYmQiOiIzMC0xMC0yMDAxIiwidXNlcl9nb3Zlcm5vcmF0ZSI6ImZheW91bSIsImlzX2FkbWluIjoiYWRtaW4ifSwiaWF0IjoxNjgzOTE2MDQ0fQ.L2krv-gpAVPG9OEBruscdIowfGzQ8MwMDpyY3TFCMlI'
    };
    var request = http.Request(
        'PATCH',
        Uri.parse(
            'http://10.0.2.2:4242/transactions/$ssn/report/${tt.transactionId}'));

    request.headers.addAll(headers);

    http.StreamedResponse response = await request.send();

    if (response.statusCode == 200) {
      print(await response.stream.bytesToString());
    } else {
      print(response.reasonPhrase);
    }
  }

  Future<void> LaunchURL(String url) async {
    final Uri uri = Uri(host: url);

    if (!await launchUrl(
      uri,
      mode: LaunchMode.externalApplication,
    )) {
      throw " can not launch url";
    }
  }

  @override
  Widget build(BuildContext context) {
    var cc = FineCubit.get(context).finemodel.transactions;

    String session_url;

    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white10,
        foregroundColor: Color.fromARGB(255, 7, 7, 7),
      ),
      body: Padding(
        padding: EdgeInsets.all(30),
        child: SingleChildScrollView(
          child: Column(
            children: [
              ClipRRect(
                // borderRadius: BorderRadius.circular(8.0), // Set the border radius to achieve rounded corners
                child: Image.asset(
                  'assets/plates/' + tt.vehicleImage,
                  height: 150,
                  width: double.infinity,
                ),
              ),
              SizedBox(
                height: 30,
              ),
              itemProfile('Transaction Number', tt.transactionId.toString(),
                  CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('License', tt.vehicle, CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile(
                  'Fee', tt.fine.toString(), CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('Date', tt.adjustmentDate.toString(),
                  CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('Time', tt.adjustmentTime.toString(),
                  CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('Place', tt.place, CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile('Payment State', tt.paymentStatus,
                  CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              itemProfile(
                  'Report State', tt.isReported, CupertinoIcons.car_detailed),
              SizedBox(
                height: 30,
              ),
              ElevatedButton(
                  onPressed: () {
                    transactionreport();
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(
                        255, 232, 54, 54), // Set the background color to red
                  ),
                  child: Text(
                    "Report",
                  )),
              ElevatedButton(
                  onPressed: () {
                    // print(${widget.tt.transactionId});
                    DioHelper.getData(
                      url:
                          'http://192.168.1.3:4242/transactions/$ssn/checkout-session/${tt.transactionId}',
                      //      10.0.2.2:4242/transactions/30012012300977/checkout-session/102
                    ).then((value) {
                      session_url = value.data['url'];
                      navigateTo(context, PaymentWebWiew(session_url));
                      print('your seeion url $session_url');
                    }).catchError((error) {
                      print(error.toString());
                    });
                    // LaunchURL('$session_surl');

                    // navigateTo(context, PaymentWebWiew(session_url));
                  },
                  child: Text(
                    "Pay",
                  )),
            ],
          ),
        ),
      ),
    );
  }

  itemProfile(String title, String subtitle, IconData iconData) {
    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              offset: Offset(0, 5),
              color: Colors.blue.withOpacity(.2),
              spreadRadius: 3,
              blurRadius: 10,
            ),
          ]),
      child: ListTile(
        title: Text(title),
        subtitle: Text(subtitle),
        leading: Icon(iconData),
        tileColor: Colors.white,
      ),
    );
  }
}
