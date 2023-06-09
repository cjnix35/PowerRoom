#include "overload/overload.hpp"

overmain(argc, argv) {

    over::Application app(IS_DEBUG);

    app.set_title("PowerRoom");
    app.set_size(1200, 700);
    app.navigate_url("http://localhost:8080");
    app.run();

    return 0;
}