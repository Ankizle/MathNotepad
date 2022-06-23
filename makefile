INCLUDE = -I$(CURDIR)

CFLAGS = -c $(INCLUDE) -O4 -fpic

SRC := $(wildcard */*.c)
OBJ := $(patsubst %.c, %.o, $(SRC))

OUT = libmntb.so

shared: $(OBJ)
	$(CC) -shared -o $(OUT) $(OBJ)

vscode: shared
	mv $(OUT) frontend/vscode/src
	cd frontend/vscode/ && npm run compile

clean:
	rm -r $(OBJ)
	rm $(OUT)