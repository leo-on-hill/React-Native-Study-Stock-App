//
//  MyRCTRootView.m
//  WeatherApp
//
//  Created by liu on 4/28/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "MyRCTRootView.h"

@implementation MyRCTRootView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}



- (instancetype)initWithBridge:(RCTBridge *)bridge
                    moduleName:(NSString *)moduleName NS_DESIGNATED_INITIALIZER{
  
}
*/


- (instancetype) initWithBridge:(RCTBridge *)bridge moduleName:(NSString *)moduleName{
  self= [super initWithBridge:bridge moduleName:moduleName];
  self.backgroundColor = [UIColor blackColor];
  self.contentView.backgroundColor = [UIColor blackColor];
  return self;
}

@end
