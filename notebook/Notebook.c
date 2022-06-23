#include <stdio.h>
#include <stdlib.h>

#include "Notebook.h"
#include "general/Encoding.h"

struct Notebook *NewNotebook(char* filename) {
    struct Notebook *d = malloc(sizeof(struct Notebook));

    FILE* f = fopen(filename, "w+");

    fprintf(f, "MNB");

    d->file = f;

    return d;
}

struct Notebook* OpenNotebook(char* filename) {
    struct Notebook *d = malloc(sizeof(struct Notebook));

    FILE* f = fopen(filename, "r+");
    d->file = f;

    //TODO

    return d;
}

void CloseNotebook(struct Notebook *d) {
    fclose(d->file);
}

struct Encoding *EncodeNotebook(struct Notebook *d) {
    struct Encoding *e = malloc(sizeof(struct Encoding));
    return e;
}