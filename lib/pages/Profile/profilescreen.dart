import 'package:carta/shared/constants/constants.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';

import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white10,
        foregroundColor: Color.fromARGB(255, 7, 7, 7),
      ),
      body: Padding(
        padding: const EdgeInsets.all(40.0),
        child: SingleChildScrollView(
          child: Column(
            children: [
              CircleAvatar(
                radius: 70,
                backgroundImage: AssetImage('assets/logo.png'),
              ),
              SizedBox(
                height: 30,
              ),
              itemProfile('Name', '$user_name', CupertinoIcons.person),
              SizedBox(
                height: 30,
              ),
              itemProfile(
                  'Email Address', '$user_mail', CupertinoIcons.mail_solid),
              SizedBox(
                height: 30,
              ),
              itemProfile('National Number', '$ssn', CupertinoIcons.person),
              SizedBox(
                height: 30,
              ),
              itemProfile('Nationality', '$user_nationality',
                  CupertinoIcons.placemark_fill),
              SizedBox(
                height: 30,
              ),
              itemProfile(
                  'Address', '$user_address', CupertinoIcons.placemark_fill),
              SizedBox(
                height: 30,
              ),
              itemProfile(
                  'Job', '$user_job', CupertinoIcons.person_alt_circle_fill),
              SizedBox(
                height: 30,
              ),
              itemProfile('Mobile Phone', '$user_phone',
                  CupertinoIcons.phone_circle_fill),
              SizedBox(
                height: 30,
              ),
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
