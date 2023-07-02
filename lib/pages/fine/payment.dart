import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:url_launcher/url_launcher.dart';

class PaymentWebWiew extends StatelessWidget {
  String url;

  PaymentWebWiew(this.url);

  @override
  Widget build(BuildContext context) {
    final Uri url1 = Uri.parse(url);
    return Scaffold(
        appBar: AppBar(),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              ElevatedButton(
                  onPressed: () {
                    launchUrl(url1);
                  },
                  child: Text("pay fine"))
            ],
          ),
        ));
  }
}
