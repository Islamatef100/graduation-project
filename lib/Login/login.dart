import 'package:carta/models/loginModel.dart';
import 'package:carta/network/local/cache_helper.dart';
import 'package:carta/pages/signup.dart';
import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
//import 'package:p/Layout/carta/carta_layout.dart';
import 'package:carta/Login/cubit/login_states.dart';
import 'package:carta/network/remote/dio_Helper.dart';
//import 'package:p/pages/Home/home.dart';
import 'package:carta/Login/cubit/login_cubit.dart';
import 'package:carta/Login/cubit/login_states.dart';
import 'package:carta/shared/Components/components.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../Layout/layoutScreen.dart';

class LoginScreen extends StatefulWidget {
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    final _formfield = GlobalKey<FormState>();
    var emailController = TextEditingController();
    var passwordController = TextEditingController();
    return BlocConsumer<CartaLoginCubit, CartaLoginStates>(
      listener: (context, state) {
        if (state is CartaLoginSuccessState) {
          if (state.cartaloginmodel.status!) {
            print(state.cartaloginmodel.status);
            print(state.cartaloginmodel.token);
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: Container(
              alignment: Alignment.center,
              color: Colors.green,
              height: 50,
              child: Text("you login successfully"),
            )));
            CacheHelper.saveData(
                key: 'ssn', value: state.cartaloginmodel.data?.userssn);
            CacheHelper.saveData(
                key: 'user_name', value: state.cartaloginmodel.data?.username);
            CacheHelper.saveData(
                key: 'user_mail', value: state.cartaloginmodel.data?.useremail);
            CacheHelper.saveData(
                key: 'user_nationality',
                value: state.cartaloginmodel.data?.usernationality);
            CacheHelper.saveData(
                key: 'user_phone',
                value: state.cartaloginmodel.data?.userphone);
            CacheHelper.saveData(
                key: 'user_address',
                value: state.cartaloginmodel.data?.useraddress);
            CacheHelper.saveData(
                key: 'user_job', value: state.cartaloginmodel.data?.userjob);
            CacheHelper.saveData(
                    key: 'token', value: state.cartaloginmodel.token)
                .then((value) {
              token = state.cartaloginmodel.token;
              navigateTo(context, layoutScreen());
            });
          } else {
            print("failed to login");

            ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: Container(
              alignment: Alignment.center,
              color: Colors.red,
              height: 50,
              child: Text("failed to login"),
            )));
          }
        }
      },
      builder: (context, state) {
        bool isPassword = CartaLoginCubit.get(context).isPassword;

        return Scaffold(
          body: SingleChildScrollView(
            child: Center(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Form(
                  key: _formfield,
                  child: Column(children: [
                    // Text(token.toString()),
                    Image.asset(
                      'assets/logo.png',
                      width: 250,
                      height: 250,
                    ),
                    Text(
                      "Login",
                      style: TextStyle(
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    TextFormField(
                      controller: emailController,
                      keyboardType: TextInputType.emailAddress,
                      onFieldSubmitted: (String value) {},
                      validator: (value) {
                        // bool emailvalid = RegExp(
                        //         r"^[a-zA-Z0-9.a-zA-z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\/[a-zA-Z]+")
                        //     .hasMatch(value!);
                        if (value!.isEmpty) {
                          return "please enter your email Address";
                        }
                        // // else if (!emailvalid) {
                        // //   return "enter valid email";
                        // // }
                        // return null;
                      },
                      decoration: InputDecoration(
                        labelText: 'Email Address',
                        contentPadding:
                            EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(30)),
                        prefixIcon: Icon(
                          Icons.email,
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 30,
                    ),
                    TextFormField(
                      controller: passwordController,

                      keyboardType: TextInputType
                          .visiblePassword, //make the @ sign visible in the keyboard during writing the email
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "please enter your password";
                        }
                        //return null;
                      },
                      onFieldSubmitted: (value) {
                        if (_formfield.currentState!.validate()) {
                          CartaLoginCubit.get(context).userLogin(
                              email: emailController.text,
                              password: passwordController.text);
                        }
                      },
                      obscureText: isPassword,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        contentPadding:
                            EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(30)),
                        prefixIcon: Icon(
                          Icons.lock,
                        ),
                        suffix: IconButton(
                          onPressed: () {
                            CartaLoginCubit.get(context)
                                .changePasswordVisiibility();
                          },
                          icon: Icon(Icons.remove_red_eye),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 30,
                    ),
                    ConditionalBuilder(
                      condition: state is! CartaLoginLoadingState,
                      builder: (context) => Column(
                        children: [
                          ElevatedButton(
                              onPressed: () {
                                if (_formfield.currentState!.validate()) {
                                  //verify backend
                                  CartaLoginCubit.get(context).userLogin(
                                      email: emailController.text,
                                      password: passwordController.text);
                                }
                              },
                              child: Text(
                                "submit",
                              )),
                          SizedBox(
                            height: 30,
                          ),
                        ],
                      ),
                      fallback: (context) =>
                          Center(child: CircularProgressIndicator()),
                    ),

                    ElevatedButton(
                        onPressed: () {
                          navigateTo(context, SignupScreen());
                        },
                        child: Text(
                          "signup",
                        )),
                  ]),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
