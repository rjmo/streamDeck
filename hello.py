from pynput.keyboard import Key, Controller
import time
import sys

print('ok'+sys.argv[1])

keyboard = Controller()

# Press and release spaceaaAAHello World
# with keyboard.pressed(eval(sys.argv[1])):
#     keyboard.press('x')
#     time.sleep(0.5)
#     keyboard.release('x')

with keyboard.pressed(Key.cmd):
    keyboard.press(Key.tab)
    time.sleep(0.5)
    keyboard.release(Key.tab)

# keyboard.press(Key.ctrl)
# time.sleep(0.5)
# keyboard.press(Key.ctrl)

# Type a lower case A; this will work even if no key on the
# physical keyboard is labelled 'A'
# keyboard.press('a')
# keyboard.release('a')
#
# # Type two upper case As aAAHello World aAAHello World aAAHello World
# keyboard.press('A')
# keyboard.release('A')
# with keyboard.pressed(Key.shift):
#     keyboard.press('a')
#     keyboard.release('a')
#
# # Type 'Hello World' using the shortcut type method
# keyboard.type('Hello World')