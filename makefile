INCLUDE = -I$(CURDIR)

CFLAGS = $(INCLUDE) -O4

SRC := $(wildcard */*.c)
OBJ := $(patsubst %.c, %.o, $(SRC))

OUT = "mntb.bin"

all: $(OBJ)
	$(CC) $(OBJ) -o $(OUT)

clean:
	rm -r $(OBJ)
	rm $(OUT)