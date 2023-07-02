import 'package:carta/Layout/layoutCubit.dart';
import 'package:carta/Layout/layoutStates.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class layoutScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocConsumer<LayoutCubit, LayoutStates>(
      listener: (context, state) {},
      builder: (context, state) {
        return BlocConsumer<LayoutCubit, LayoutStates>(
          listener: (context, state) {
            // TODO: implement listener
          },
          builder: (context, state) {
            var layoutCubit = LayoutCubit.get(context);
            return Scaffold(
              body: layoutCubit.screens[layoutCubit.currentIndex],
              bottomNavigationBar: BottomNavigationBar(
                  onTap: (index) {
                    layoutCubit.changeBottomNavBar(index);
                  },
                  currentIndex: layoutCubit.currentIndex,
                  items: [
                    BottomNavigationBarItem(
                      icon: Icon(Icons.home),
                      label: 'Home',
                    ),
                    BottomNavigationBarItem(
                      icon: Icon(Icons.money_sharp),
                      label: 'Fines',
                    ),
                    BottomNavigationBarItem(
                      icon: Icon(Icons.car_crash),
                      label: 'Car',
                    ),
                  ]),
            );
          },
        );
      },
    );
  }
}
