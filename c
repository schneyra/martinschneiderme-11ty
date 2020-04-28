case "$1" in
        start)
            docker-compose up -d
            ;;
        stop)
            docker-compose down
            ;;
        shell)
            shift
            docker exec -ti martinschneiderme-11ty_node yarn $@
            ;;  
        yarn)
            shift
            docker exec -ti martinschneiderme-11ty_node yarn $@
            ;;   
        serve)
            shift
            docker exec -ti martinschneiderme-11ty_node npx @11ty/eleventy --serve
            ;;      
        build)
            shift
            docker exec -ti martinschneiderme-11ty_node npx @11ty/eleventy
            ;;
esac
